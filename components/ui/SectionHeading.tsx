import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">{eyebrow}</p>
      <h2 className="text-balance text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
