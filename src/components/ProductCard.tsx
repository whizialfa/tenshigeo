import Link from "next/link";
import { EDITIONS } from "@/lib/editions";
import { getDestination } from "@/lib/destinations";
import type { CatalogProduct } from "@/lib/types";

export function ProductCard({ product }: { product: CatalogProduct }) {
 const edition = EDITIONS[product.editionId];
 const dest = getDestination(product.destinationId);

 return (
  <Link
   href={`/maps/${product.slug}`}
   className="group block overflow-hidden rounded-2xl border border-[var(--line)] bg-card transition hover:-translate-y-1 hover:shadow-lg"
  >
   <div
    className="relative aspect-[4/5] overflow-hidden"
    style={{ background: edition.land }}
   >
    <MapThumb land={edition.land} road={edition.road} water={edition.water} />
    <div
     className="absolute inset-x-0 bottom-0 p-4 pt-10"
     style={{
      background: `linear-gradient(transparent, ${edition.paper})`,
     }}
    >
     <p
      className="font-display text-lg font-bold tracking-wide"
      style={{ color: edition.label }}
     >
      {product.words.title}
     </p>
     <p className="text-xs" style={{ color: edition.accent }}>
      {product.words.subtitle}
     </p>
    </div>
    {product.isBook && (
     <span className="absolute left-3 top-3 rounded-full bg-slate-950/90 px-2.5 py-1 text-[11px] font-semibold text-on-cta">
      Map book
     </span>
    )}
   </div>
   <div className="flex items-start justify-between gap-3 p-4">
    <div>
     <h3 className="font-semibold text-ink group-hover:text-sea">
      {product.title}
     </h3>
     <p className="mt-1 text-xs text-ink-soft">
      {dest?.name}
      {dest ? " · " : ""}
      {edition.name}
     </p>
    </div>
    <p className="shrink-0 text-sm font-bold text-ink">${product.priceUsd}</p>
   </div>
  </Link>
 );
}

function MapThumb({
 land,
 road,
 water,
}: {
 land: string;
 road: string;
 water: string;
}) {
 return (
  <svg viewBox="0 0 200 250" className="h-full w-full opacity-90" aria-hidden>
   <rect width="200" height="250" fill={land} />
   <path d="M0 180 Q60 140 120 170 T200 150 L200 250 L0 250 Z" fill={water} opacity="0.85" />
   <path d="M20 0 L35 250" stroke={road} strokeWidth="1.2" opacity="0.7" />
   <path d="M70 0 L55 250" stroke={road} strokeWidth="0.8" opacity="0.55" />
   <path d="M110 0 L140 250" stroke={road} strokeWidth="1.4" opacity="0.75" />
   <path d="M160 0 L150 250" stroke={road} strokeWidth="0.7" opacity="0.5" />
   <path d="M0 60 L200 80" stroke={road} strokeWidth="1" opacity="0.6" />
   <path d="M0 110 L200 95" stroke={road} strokeWidth="0.8" opacity="0.5" />
   <path d="M0 140 L200 155" stroke={road} strokeWidth="1.1" opacity="0.65" />
   <circle cx="95" cy="105" r="3" fill={road} />
  </svg>
 );
}
