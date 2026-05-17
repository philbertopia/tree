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
      <nav className="container-shell flex h-20 items-center justify-between" aria-label="Primary navigation">
        <Link href="/" className="text-lg font-black tracking-[0.3em] text-tree-green">
          TREE
        </Link>
        <div className="hidden items-center gap-8 md:flex">
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-tree-green md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-[75] bg-tree-black/95 p-6 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} className="font-black tracking-[0.3em] text-tree-green">
              TREE
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-20 grid gap-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-black tracking-tight text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mx-auto mt-6 rounded-full bg-tree-green px-6 py-3 font-bold text-black"
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
