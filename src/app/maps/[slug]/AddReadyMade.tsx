"use client";

import { useRouter } from "next/navigation";
import { getProduct, productToDesign } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function AddReadyMade({ productSlug }: { productSlug: string }) {
 const { addItem } = useCart();
 const router = useRouter();
 const product = getProduct(productSlug);
 if (!product) return null;

 return (
  <button
   type="button"
   className="rounded-full border border-ink/20 bg-card px-6 py-3 text-sm font-semibold"
   onClick={() => {
    addItem({
     design: productToDesign(product),
     priceUsd: product.priceUsd,
     label: product.title,
    });
    router.push("/bag");
   }}
  >
   Buy as shown
  </button>
 );
}
