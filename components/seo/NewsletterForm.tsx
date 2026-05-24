"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionType: "newsletter",
          name: data.name,
          email: data.email,
          businessType: "Newsletter",
          budget: "Newsletter",
          source: "TREE Field Notes",
          automation: "Newsletter signup for TREE Field Notes"
        })
      });

      if (!res.ok) throw new Error("Newsletter signup failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_1.2fr_auto]">
      <label className="sr-only" htmlFor="newsletter-name">
        Name
      </label>
      <input
        id="newsletter-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Name"
        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-tree-green"
      />
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-tree-green"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-tree-green px-5 font-bold text-black transition hover:bg-tree-leaf disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mail className="h-4 w-4" />
        {status === "loading" ? "Joining..." : "Join"}
      </button>
      {status === "success" ? (
        <p className="text-sm font-semibold text-tree-green sm:col-span-3">You are on the Field Notes list.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm font-semibold text-red-400 sm:col-span-3">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
