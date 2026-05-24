import Link from "next/link";
import { navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 pb-10 pt-10">
      <div className="container-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="text-lg font-black tracking-[0.28em] text-tree-green">
              TREE
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Practical AI systems, human-guided automation, and tools your team can actually use.
            </p>
            <p className="mt-3 text-xs text-gray-600">Hudson Valley, NY · hello@treesystems.ai · (201) 279-1840</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm text-gray-500">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-tree-green">
                {item.label}
              </Link>
            ))}
            <a href="sms:+12012791840" className="transition hover:text-tree-green">
              Text us
            </a>
            <Link href="/contact" className="transition hover:text-tree-green">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/[0.06] pt-6 text-xs text-gray-700">
          © {new Date().getFullYear()} TREE Systems. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
