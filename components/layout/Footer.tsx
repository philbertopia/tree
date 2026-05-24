import Link from "next/link";
import { navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-lg font-black tracking-[0.28em] text-tree-green">
            TREE
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            Practical AI systems, human-guided automation, and tools your team can actually use.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm text-gray-500">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-tree-green">
              {item.label}
            </Link>
          ))}
          <a href="sms:+12012791840" className="transition hover:text-tree-green">
            Text (201) 279-1840
          </a>
          <Link href="/contact" className="transition hover:text-tree-green">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
