import { NextResponse } from "next/server";
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  readLimitedJson,
  RequestBodyTooLargeError
} from "@/lib/server-security";

type AssistantMode = "planner" | "widget" | "plan";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "google/gemma-3n-e2b-it";

const modePrompts: Record<AssistantMode, string> = {
  widget:
    "You are Seed, TREE's friendly website AI assistant. Keep replies brief, warm, and practical. Help visitors identify one useful AI system for their business, then invite them to try the full AI Systems Planner. Ask one question at a time. Avoid hype, fake metrics, guarantees, and emojis.",
  planner:
    "You are Seed, TREE's AI Systems Planner. You help business owners map practical AI systems, automations, dashboards, training, and human-review workflows. Be grounded, operational, concise, and intelligent. Ask one useful question at a time when details are missing. Recommend TREE-style systems only when they fit: AI receptionist or intake assistant, workflow automation, dashboard system, weekly aggregator, marketing follow-up system, training and ownership system, and human-review approval workflow. Do not overpromise. Do not use emojis.",
  plan:
    "You are Seed, TREE's AI Systems Planner. Create a structured AI workflow plan from the conversation. Use clear headings: Business Snapshot, Main Bottleneck, Recommended First System, Suggested Automations, Human Review Checkpoints, Dashboard Or Visibility Idea, First Step With TREE. Be specific, practical, and honest. Do not invent metrics or claim implementation has already happened. Do not use emojis."
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit({ key: `assistant:${ip}`, limit: 12, windowMs: 60_000 });

    if (!limit.allowed) {
      return rateLimitResponse(limit.resetAt);
    }

    const body = await readLimitedJson<{
      mode?: AssistantMode;
      messages?: ClientMessage[];
    }>(request, 24_000);

    const mode = body.mode && modePrompts[body.mode] ? body.mode : "planner";
    const messages = sanitizeMessages(body.messages);

    if (!messages.length) {
      return NextResponse.json({ ok: false, error: "Please send a message first." }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      console.error("[Seed assistant] NVIDIA_API_KEY is missing.");
      return NextResponse.json(
        { ok: false, error: "Seed is not connected yet. Add the NVIDIA API key on the server." },
        { status: 500 }
      );
    }

    const response = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: modePrompts[mode] }, ...messages],
        max_tokens: mode === "plan" ? 760 : mode === "planner" ? 520 : 260,
        temperature: mode === "plan" ? 0.18 : 0.28,
        top_p: 0.72,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false
      })
    });

    const text = await response.text();
    const data = parseJson(text);

    if (!response.ok) {
      console.error("[Seed assistant] NVIDIA request failed:", response.status, data?.error ?? text.slice(0, 300));
      return NextResponse.json(
        {
          ok: false,
          error: "Seed had trouble reaching the model. Please try again in a moment."
        },
        { status: response.status }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("[Seed assistant] Empty model response:", data);
      return NextResponse.json(
        { ok: false, error: "Seed received an empty response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      reply,
      usage: data?.usage ?? null
    });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "Invalid JSON request." }, { status: 400 });
    }

    console.error("[Seed assistant] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Seed hit an unexpected issue. Please try again." },
      { status: 500 }
    );
  }
}

function sanitizeMessages(messages: ClientMessage[] | undefined): ClientMessage[] {
  if (!Array.isArray(messages)) return [];

  const cleaned = messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role,
      content: String(message.content ?? "").trim().slice(0, 2400)
    }))
    .filter((message) => message.content.length > 0)
    .slice(-12);

  while (cleaned[0]?.role === "assistant") {
    cleaned.shift();
  }

  return cleaned.reduce<ClientMessage[]>((alternating, message) => {
    const previous = alternating[alternating.length - 1];
    if (!previous || previous.role !== message.role) {
      alternating.push(message);
      return alternating;
    }

    if (message.role === "user") {
      previous.content = `${previous.content}\n\n${message.content}`;
    }

    return alternating;
  }, []);
}

function parseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
