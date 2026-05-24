"use client";

import { FormEvent, useState } from "react";
import { Bot, Mail, MessageCircle, UserRound } from "lucide-react";
import { budgetRanges, businessTypes } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";

const textNumberDisplay = "(201) 279-1840";
const textNumberHref = "sms:+12012791840";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.info("TREE consultation form submission", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <GlassCard className="grid min-h-[520px] place-items-center text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-tree-green">Message received</p>
          <h2 className="mt-5 text-4xl font-black text-white">Your message is growing roots.</h2>
          <p className="mx-auto mt-4 max-w-md leading-8 text-gray-400">We'll be in touch within one business day.</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField label="Business Type" name="businessType" options={businessTypes} required />
        <SelectField label="Estimated Budget" name="budget" options={budgetRanges} required />
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white">What do you want to automate?</span>
        <textarea
          name="automation"
          required
          rows={7}
          placeholder="Describe your biggest time sink, bottleneck, or the thing you wish happened automatically..."
          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-tree-green"
        />
      </label>
      <Field label="How did you hear about TREE? (optional)" name="source" />
      <button
        type="submit"
        className="min-h-12 rounded-full bg-tree-green px-6 py-3 font-bold text-black transition hover:bg-tree-leaf focus:outline-none focus:ring-2 focus:ring-tree-green focus:ring-offset-2 focus:ring-offset-tree-black"
      >
        Start Growing Your System →
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-tree-green"
      />
    </label>
  );
}

function SelectField({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <select
        name={name}
        required={required}
        className="h-12 rounded-xl border border-white/10 bg-tree-black px-4 text-white outline-none transition focus:border-tree-green"
        defaultValue=""
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ContactOptions() {
  const options = [
    {
      Icon: MessageCircle,
      label: "Text TREE",
      detail: `${textNumberDisplay} - texting available now`,
      href: textNumberHref
    },
    {
      Icon: Mail,
      label: "Email TREE",
      detail: "hello@treesystems.ai",
      href: "mailto:hello@treesystems.ai"
    },
    {
      Icon: Bot,
      label: "AI secretary",
      detail: "Coming soon for faster intake"
    },
    {
      Icon: UserRound,
      label: "Human follow-up",
      detail: "We review every serious inquiry directly"
    }
  ];

  return (
    <div className="mt-10 grid gap-3">
      {options.map(({ Icon, label, detail, href }) => {
        const content = (
          <>
            <Icon className="h-5 w-5 flex-none text-tree-green" />
            <span>
              <span className="block font-semibold text-white">{label}</span>
              <span className="mt-1 block text-sm text-gray-400">{detail}</span>
            </span>
          </>
        );

        const className =
          "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-gray-300 transition hover:border-tree-green/30 hover:bg-tree-green/5";

        return href ? (
          <a key={label} href={href} className={className}>
            {content}
          </a>
        ) : (
          <div key={label} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
