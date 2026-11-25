"use client";

import { ProductCard } from "@/components/ProductCard";
import { CATALOG } from "@/lib/catalog";
import { DESTINATIONS } from "@/lib/destinations";
import { EDITION_LIST } from "@/lib/editions";
import type { EditionId, OccasionId } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CollectionsInner() {
  const sp = useSearchParams();
  const edition = (sp.get("edition") as EditionId | null) || undefined;
  const destination = sp.get("destination") || undefined;
  const occasion = (sp.get("occasion") as OccasionId | null) || undefined;

  let products = CATALOG;
  if (edition) products = products.filter((p) => p.editionId === edition);
  if (destination)
    products = products.filter((p) => p.destinationId === destination);
  if (occasion) products = products.filter((p) => p.occasion === occasion);

  const shown =
    !edition && !destination && !occasion
      ? [
          ...CATALOG.filter((p) => p.occasion !== "city"),
          ...CATALOG.filter((p) => p.occasion === "city").filter(
            (_, i) => i % 7 === 0,
          ),
        ]
      : products;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold">Collections</h1>
      <p className="mt-2 text-ink-soft">
        {shown.length} designs · filter by destination, colour, or occasion
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip
          href="/collections"
          active={!edition && !destination && !occasion}
        >
          All
        </FilterChip>
        {(
          ["love", "distance", "proposal", "gift", "book"] as OccasionId[]
        ).map((o) => (
          <FilterChip
            key={o}
            href={`/collections?occasion=${o}`}
            active={occasion === o}
          >
            {o}
          </FilterChip>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EDITION_LIST.map((ed) => (
          <FilterChip
            key={ed.id}
            href={`/collections?edition=${ed.id}`}
            active={edition === ed.id}
          >
            {ed.name}
          </FilterChip>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {DESTINATIONS.map((d) => (
          <FilterChip
            key={d.id}
            href={`/collections?destination=${d.id}`}
            active={destination === d.id}
          >
            {d.name}
          </FilterChip>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 text-ink-soft sm:px-6">
          Loading collections…
        </div>
      }
    >
      <CollectionsInner />
    </Suspense>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
        active
          ? "bg-slate-950 text-white"
          : "border border-[var(--line)] bg-card text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
