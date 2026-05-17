import { trustItems } from "@/lib/data";

export function TrustTicker() {
  const items = [...trustItems, ...trustItems, ...trustItems, ...trustItems];
  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.015] py-4" aria-label="TREE capabilities">
      <div className="flex w-max animate-marquee gap-7 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="text-xs font-bold uppercase tracking-[0.35em] text-gray-600">
            {item} <span className="ml-7 text-white/10">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
