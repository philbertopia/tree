import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, string>;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "hello@treesystems.ai";

    if (apiKey) {
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
          subject: `New consultation request from ${data.name}`,
          html: `
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
          `
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("[TREE contact] Resend error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
      }
    } else {
      console.info("[TREE contact form submission — set RESEND_API_KEY to enable email delivery]", data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[TREE contact] Unexpected error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function esc(str: string = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
