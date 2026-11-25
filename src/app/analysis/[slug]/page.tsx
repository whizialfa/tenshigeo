import Link from "next/link";
import { notFound } from "next/navigation";
import { ANALYSIS_PACKAGES, getPackage } from "@/lib/services";

export function generateStaticParams() {
  return ANALYSIS_PACKAGES.map((p) => ({ slug: p.slug }));
}

export default async function PackagePage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const pkg = getPackage(slug);
 if (!pkg) notFound();

 return (
  <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
   <Link href="/analysis" className="text-sm font-bold text-sea">
    ← All services
   </Link>
   <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-sea">
    {pkg.category.replace("-", " ")}
    {pkg.proven ? " · proven in portfolio" : ""}
   </p>
   <h1 className="font-display mt-2 text-4xl font-bold text-ink">{pkg.name}</h1>
   <p className="mt-3 text-lg text-ink-soft">{pkg.tagline}</p>
   <p className="mt-4 text-base leading-relaxed text-muted">{pkg.demand}</p>

   <h2 className="font-display mt-10 text-xl font-bold text-ink">Includes</h2>
   <ul className="mt-3 list-inside list-disc space-y-2 text-ink-soft">
    {pkg.includes.map((i) => (
     <li key={i}>{i}</li>
    ))}
   </ul>

   <h2 className="font-display mt-8 text-xl font-bold text-ink">You receive</h2>
   <ul className="mt-3 list-inside list-disc space-y-2 text-ink-soft">
    {pkg.deliverables.map((i) => (
     <li key={i}>{i}</li>
    ))}
   </ul>

   <h2 className="font-display mt-10 text-xl font-bold text-ink">Tiers</h2>
   <div className="mt-4 grid gap-4 sm:grid-cols-3">
    {pkg.tiers.map((t) => (
     <div key={t.id} className="rounded-2xl border border-[var(--line)] bg-card shadow-sm rounded-2xl p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-sea">
       {t.label}
      </p>
      <p className="font-display mt-2 text-2xl font-bold text-ink">
       ${t.priceFromUsd}
       <span className="text-sm font-medium text-muted"> from</span>
      </p>
      <p className="mt-1 text-xs font-semibold text-ink-soft">{t.days}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">{t.note}</p>
     </div>
    ))}
   </div>

   <Link href={`/request?package=${pkg.slug}`} className="inline-flex items-center justify-center tg-link-on-dark rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:opacity-90 mt-10">
    Request this package
   </Link>
  </div>
 );
}
