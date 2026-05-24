import Link from "next/link";
import { siteUrl } from "@/lib/seo-content";
import { JsonLd } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${siteUrl}${item.href === "/" ? "" : item.href}`
          }))
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-gray-500">
        {allItems.map((item, index) => (
          <span key={item.href} className="inline-flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === allItems.length - 1 ? (
              <span className="text-gray-300">{item.label}</span>
            ) : (
              <Link href={item.href} className="font-semibold text-tree-green transition hover:text-tree-leaf">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
