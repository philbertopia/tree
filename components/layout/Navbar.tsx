"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-white/10 bg-tree-black/90 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-tree-green focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip to main content
      </a>
      <nav className="container-shell flex h-20 items-center justify-between gap-4" aria-label="Primary navigation">
        <Link href="/" className="shrink-0 text-lg font-black tracking-[0.3em] text-tree-green">
          TREE
        </Link>
        <div className="hidden min-w-0 items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-400 transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-2.5 text-sm font-semibold text-tree-green transition hover:bg-tree-green hover:text-black"
          >
            Consult →
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-tree-green transition hover:border-tree-green/30 hover:bg-tree-green/10 md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="container-shell pb-4 md:hidden">
          <div className="rounded-2xl border border-white/10 bg-tree-black/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-gray-200 transition hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-tree-green px-4 font-bold text-black transition hover:bg-tree-leaf"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
