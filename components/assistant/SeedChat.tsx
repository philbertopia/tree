"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SeedOrb } from "@/components/assistant/SeedOrb";
import type { SeedMessage, SeedMode, SeedPrompt } from "@/components/assistant/types";

type SeedChatProps = {
  variant: "page" | "widget";
  initialMessages: SeedMessage[];
  starterPrompts: SeedPrompt[];
  className?: string;
  showHeaderOrb?: boolean;
  avatarRef?: React.Ref<HTMLDivElement>;
};

export function SeedChat({
  variant,
  initialMessages,
  starterPrompts,
  className,
  showHeaderOrb = true,
  avatarRef
}: SeedChatProps) {
  const [messages, setMessages] = useState<SeedMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const isPage = variant === "page";

  const userMessageCount = useMemo(() => messages.filter((message) => message.role === "user").length, [messages]);

  async function sendMessage(content: string, mode: SeedMode = isPage ? "planner" : "widget") {
    const trimmed = content.trim();
    if (!trimmed || loading || planLoading) return;

    const nextMessages: SeedMessage[] = [
      ...messages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed
      }
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(mode !== "plan");
    setPlanLoading(mode === "plan");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: nextMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent }))
        })
      });
      const data = (await response.json()) as { ok?: boolean; reply?: string; error?: string };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Seed had trouble responding.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply || ""
        }
      ]);

      requestAnimationFrame(() => {
        messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Seed had trouble responding.";
      setError(message);
    } finally {
      setLoading(false);
      setPlanLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function generatePlan() {
    void sendMessage(
      "Generate my AI workflow plan from this conversation. Use the structured TREE format with practical next steps.",
      "plan"
    );
  }

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden border border-white/10 bg-[#070b0a]/90 shadow-2xl shadow-black/45 backdrop-blur-xl",
        isPage ? "rounded-[1.75rem]" : "rounded-2xl",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tree-green/45 to-transparent" />
      <div className={cn("flex items-center justify-between border-b border-white/10", isPage ? "p-5" : "p-4")}>
        <div className="flex min-w-0 items-center gap-3">
          <div ref={avatarRef} className="grid h-12 w-12 shrink-0 place-items-center">
            {showHeaderOrb ? <SeedOrb size={isPage ? "md" : "sm"} /> : null}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white">Seed</p>
            <p className="truncate text-xs text-gray-400">
              {isPage ? "TREE AI Systems Planner" : "TREE assistant"}
            </p>
          </div>
        </div>
        {!isPage ? (
          <Link href="/demo/ai-systems-planner" className="text-xs font-semibold text-tree-green hover:text-tree-leaf">
            Full planner
          </Link>
        ) : null}
      </div>

      <div
        ref={messagesRef}
        className={cn(
          "space-y-4 overflow-y-auto px-4 py-5 scrollbar-thin",
          isPage ? "min-h-[18rem] flex-1 sm:px-5" : "h-[20rem]"
        )}
      >
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={cn(
                "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6",
                message.role === "user"
                  ? "rounded-tr-sm bg-white/10 text-white"
                  : "rounded-tl-sm border border-tree-green/20 bg-tree-green/10 text-gray-200"
              )}
            >
              <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gray-500">
                {message.role === "user" ? "You" : "Seed"}
              </p>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {loading || planLoading ? (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-tree-cyan/20 bg-tree-cyan/10 px-4 py-3 text-sm text-gray-300">
              <Loader2 className="h-4 w-4 animate-spin text-tree-cyan" />
              {planLoading ? "Seed is shaping your workflow plan..." : "Seed is thinking..."}
            </div>
          </div>
        ) : null}
      </div>

      <div className={cn("border-t border-white/10", isPage ? "p-5" : "p-4")}>
        <div className="mb-3 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => sendMessage(prompt.prompt)}
              disabled={loading || planLoading}
              className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold leading-none text-gray-300 transition hover:border-tree-green/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {isPage && userMessageCount > 0 ? (
          <button
            type="button"
            onClick={generatePlan}
            disabled={loading || planLoading}
            className="mb-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-tree-cyan/25 bg-tree-cyan/10 px-4 text-sm font-bold text-tree-cyan transition hover:border-tree-cyan/45 hover:bg-tree-cyan/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate My AI Workflow Plan
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}

        {error ? <p className="mb-3 text-sm text-red-300">{error}</p> : null}

        <form onSubmit={onSubmit} className="grid grid-cols-[1fr_auto] gap-2">
          <label className="sr-only" htmlFor={isPage ? "seed-planner-input" : "seed-widget-input"}>
            Message Seed
          </label>
          <input
            id={isPage ? "seed-planner-input" : "seed-widget-input"}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={isPage ? "Tell Seed what you want to improve..." : "Ask Seed..."}
            className="min-h-11 rounded-full border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-tree-green/45"
            disabled={loading || planLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading || planLoading}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-tree-green text-black transition hover:bg-tree-leaf disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
