import { notFound } from "next/navigation";
import { getBusiness } from "@/lib/full";
import { OfferingsBody } from "@/components/offerings";

export default function ServicesPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  return <OfferingsBody b={b} />;
}
