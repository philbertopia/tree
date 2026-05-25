import { NextResponse } from "next/server";
import {
  getClientIp,
  isValidEmail,
  rateLimit,
  rateLimitResponse,
  readLimitedJson,
  redactedEmail,
  RequestBodyTooLargeError,
  textField
} from "@/lib/server-security";

type ContactSubmission = ReturnType<typeof normalizeContactSubmission>;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 10 * 60_000 });

    if (!limit.allowed) {
      return rateLimitResponse(limit.resetAt);
    }

    const raw = await readLimitedJson<Record<string, unknown>>(request, 12_000);
    const data = normalizeContactSubmission(raw);

    if (!data.email || !isValidEmail(data.email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!data.isNewsletter && (!data.name || !data.automation)) {
      return NextResponse.json(
        { ok: false, error: "Please include your name and what you want to automate." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    const subject = data.isNewsletter
      ? `New TREE Field Notes signup from ${redactedEmail(data.email)}`
      : `New consultation request from ${data.name}`;

    console.info("[TREE contact] New submission:", {
      type: data.isNewsletter ? "newsletter" : "consultation",
      email: redactedEmail(data.email),
      hasAutomation: Boolean(data.automation),
      source: data.source || "not provided"
    });

    if (apiKey && toEmail) {
      await sendContactEmail({ apiKey, toEmail, data, subject });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
    }

    if (err instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "Invalid JSON request." }, { status: 400 });
    }

    console.error("[TREE contact] Unexpected error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function sendContactEmail({
  apiKey,
  toEmail,
  data,
  subject
}: {
  apiKey: string;
  toEmail: string;
  data: ContactSubmission;
  subject: string;
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TREE Contact Form <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: data.email,
        subject,
        html: data.isNewsletter ? newsletterHtml(data) : consultationHtml(data)
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[TREE contact] Resend delivery failed:", err);
    } else {
      console.info("[TREE contact] Email delivered via Resend.");
    }
  } catch (deliveryErr) {
    console.error("[TREE contact] Could not reach Resend:", (deliveryErr as Error).message);
  }
}

function normalizeContactSubmission(data: Record<string, unknown>) {
  const submissionType = textField(data.submissionType, 40);

  return {
    isNewsletter: submissionType === "newsletter",
    name: textField(data.name, 120),
    email: textField(data.email, 254).toLowerCase(),
    businessType: textField(data.businessType, 120),
    budget: textField(data.budget, 120),
    automation: textField(data.automation, 3000),
    source: textField(data.source, 160)
  };
}

function newsletterHtml(data: ContactSubmission) {
  return `
    <h2 style="color:#4ade80;font-family:sans-serif">New TREE Field Notes Signup</h2>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif">
      <tr><td style="padding:8px 0;color:#888;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${esc(data.name || "Not provided")}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0">${esc(data.email)}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:13px">Source</td><td style="padding:8px 0">${esc(data.source || "Newsletter page")}</td></tr>
    </table>
  `;
}

function consultationHtml(data: ContactSubmission) {
  return `
    <h2 style="color:#4ade80;font-family:sans-serif">New Consultation Request</h2>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif">
      <tr><td style="padding:8px 0;color:#888;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${esc(data.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0">${esc(data.email)}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:13px">Business Type</td><td style="padding:8px 0">${esc(data.businessType)}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:13px">Budget</td><td style="padding:8px 0">${esc(data.budget)}</td></tr>
    </table>
    <h3 style="margin-top:24px;font-family:sans-serif">What they want to automate</h3>
    <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px;font-family:sans-serif">${esc(data.automation)}</p>
    ${data.source ? `<p style="color:#888;font-size:13px;font-family:sans-serif">Heard about TREE via: ${esc(data.source)}</p>` : ""}
  `;
}

function esc(str: string = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
