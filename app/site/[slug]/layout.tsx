import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businesses } from "@/lib/businesses";
import { getBusiness } from "@/lib/full";
import { SiteShell } from "@/components/site";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBusiness(params.slug);
  if (!b) return { title: "Website not found" };
  return {
    title: `${b.name} — ${b.area} | Official Website`,
    description: `${b.tagline} ${b.address} ${b.hours}`,
  };
}

export default function SiteLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  return <SiteShell b={b}>{children}</SiteShell>;
}
