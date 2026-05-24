import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CTAButton({ href, children, variant = "primary", className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tree-green focus:ring-offset-2 focus:ring-offset-tree-black",
        variant === "primary"
          ? "bg-tree-green text-black hover:bg-tree-leaf hover:shadow-[0_0_30px_rgba(74,222,128,0.22)]"
          : "border border-white/10 bg-white/[0.03] text-white hover:border-tree-green/40 hover:text-tree-green hover:shadow-[0_0_24px_rgba(74,222,128,0.1)]",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/20 opacity-0 blur-md transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" aria-hidden="true" />
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
