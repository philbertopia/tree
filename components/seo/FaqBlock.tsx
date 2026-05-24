import { ContentFaq } from "@/lib/seo-content";

export function FaqBlock({ faqs }: { faqs: ContentFaq[] }) {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="text-lg font-bold text-white">{faq.question}</h3>
          <p className="mt-3 leading-7 text-gray-400">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
