import { notFound } from "next/navigation";
import { getBusiness } from "@/lib/full";
import { CartPageBody } from "@/components/cart-page";

export default function CartPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  return <CartPageBody b={b} />;
}
