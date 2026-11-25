import Link from "next/link";
import { SceneryHero } from "@/components/SceneryHero";
import { ANALYSIS_PACKAGES } from "@/lib/services";

export const metadata = {
  title: "Services",
};

export default function AnalysisIndexPage() {
  return (
    <div>
      <SceneryHero
        src="/scenery/city-aerial.jpg"
        alt="Aerial cityscape with rivers and roads"
        eyebrow="Services"
        title="Analysis packages"
        body="Built from what clients buy on GIS markets — and from work already shipped for Nigerian cities. Each package has Brief / Standard / Deep dive. Prices are starting points; the quote is written after your brief."
        credit="Photo via Unsplash"
        compact
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {ANALYSIS_PACKAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/analysis/${p.slug}`}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sea"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-ink">{p.name}</h2>
                {p.proven && (
                  <span className="shrink-0 rounded-full bg-sea/15 px-2.5 py-1 text-[11px] font-bold text-sea">
                    Proven
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-soft">{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.demand}</p>
              <p className="mt-auto pt-5 text-sm font-bold text-sea">
                From ${p.tiers[0].priceFromUsd} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
