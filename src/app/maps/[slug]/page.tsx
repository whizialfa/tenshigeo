import Link from "next/link";
import { notFound } from "next/navigation";
import { RoomPreview } from "@/components/RoomPreview";
import {
  CATALOG,
  getProduct,
  productToDesign,
  productsByDestination,
} from "@/lib/catalog";
import { EDITIONS } from "@/lib/editions";
import { getDestination } from "@/lib/destinations";
import { ProductCard } from "@/components/ProductCard";
import { AddReadyMade } from "./AddReadyMade";

export function generateStaticParams() {
  return CATALOG.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const product = getProduct(slug);
 if (!product) notFound();

 const design = productToDesign(product);
 const edition = EDITIONS[product.editionId];
 const dest = getDestination(product.destinationId);
 const related = productsByDestination(product.destinationId)
  .filter((p) => p.slug !== product.slug)
  .slice(0, 4);

 return (
  <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
   <div className="grid gap-10 lg:grid-cols-2">
    <div
     className="overflow-hidden rounded-2xl border border-[var(--line)]"
     style={{ background: edition.land }}
    >
     <div className="aspect-[4/5] p-8" style={{ color: edition.label }}>
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: edition.accent }}>
       {edition.name}
      </p>
      <p className="mt-24 font-display text-4xl font-bold sm:text-5xl">
       {product.words.title}
      </p>
      <p className="mt-3 text-lg ">{product.words.subtitle}</p>
      <p className="mt-8 text-sm" style={{ color: edition.accent }}>
       {product.words.footer}
      </p>
     </div>
    </div>

    <div>
     <p className="text-sm font-semibold text-sea">
      {dest?.name}
      {dest ? `, ${dest.country}` : ""}
     </p>
     <h1 className="mt-2 font-display text-4xl font-bold text-ink">
      {product.title}
     </h1>
     <p className="mt-3 text-ink-soft">{product.subtitle}</p>
     <p className="mt-6 font-display text-3xl font-bold">${product.priceUsd}</p>
     <p className="mt-1 text-xs text-ink-soft">
      Digital download · PDF + PNG · no shipping
     </p>

     <div className="mt-8 flex flex-wrap gap-3">
      <Link
       href={`/studio?preset=${product.slug}`}
       className="bg-slate-950 text-white rounded-full px-6 py-3 text-sm font-bold"
      >
       Personalize in studio
      </Link>
      <AddReadyMade productSlug={product.slug} />
     </div>

     {product.isBook && product.bookCities && (
      <div className="mt-8 rounded-2xl border border-[var(--line)] bg-card p-5 text-sm">
       <p className="font-semibold">Includes</p>
       <ul className="mt-2 list-inside list-disc text-ink-soft">
        <li>12-page A4 PDF map book</li>
        <li>High-res PNGs for: {product.bookCities.join(", ")}</li>
       </ul>
      </div>
     )}

     {product.narrative && (
      <div className="mt-8 rounded-2xl border border-[var(--line)] bg-card p-5 text-sm text-ink-soft">
       Narrative map — customize the words and place markers in studio.
      </div>
     )}

     <div className="mt-10">
      <RoomPreview design={design} />
     </div>
    </div>
   </div>

   {related.length > 0 && (
    <section className="mt-16">
     <h2 className="font-display text-2xl font-bold">More from {dest?.name}</h2>
     <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {related.map((p) => (
       <ProductCard key={p.slug} product={p} />
      ))}
     </div>
    </section>
   )}
  </div>
 );
}
