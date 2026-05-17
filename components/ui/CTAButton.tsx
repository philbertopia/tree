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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-tree-green focus:ring-offset-2 focus:ring-offset-tree-black",
        variant === "primary"
          ? "bg-tree-green text-black hover:bg-tree-leaf"
          : "border border-white/10 bg-white/[0.03] text-white hover:border-tree-green/40 hover:text-tree-green",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
