import Image from "next/image";
import Link from "next/link";
import { SceneryBand } from "@/components/SceneryBand";
import { SceneryHero } from "@/components/SceneryHero";
import { asset } from "@/lib/asset";
import { ANALYSIS_PACKAGES, RETAINER } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/work";

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    body: "You describe the place, the question, and the deadline. A short call if needed — free.",
  },
  {
    n: "02",
    title: "Written quote",
    body: "Scope, fee, timeline, and deliverables in writing within two working days. No surprise invoices.",
  },
  {
    n: "03",
    title: "Draft first",
    body: "You see a first plate or method check while the deadline is still far away.",
  },
  {
    n: "04",
    title: "Handover",
    body: "PNG/PDF, GeoPackage or GeoTIFF, methods note, optional web map. You own the files.",
  },
];

export default function HomePage() {
  const featuredWork = CASE_STUDIES.slice(0, 3);
  const featuredServices = ANALYSIS_PACKAGES.filter((p) => p.proven).slice(0, 4);

  return (
    <div>
      <SceneryHero
        src="/scenery/aerial-grid.jpg"
        alt="Aerial view of a dense city street grid"
        eyebrow="Wisdom Akpabio · Abuja"
        title="Maps and spatial analysis, from brief to handover."
        body="TenshiGeo is a geospatial studio for walking-access studies, heat and land-cover change, site screening, publication plates, and interactive web maps — with a fixed written fee before work starts."
        credit="Photo: Maximillian Conacher / Unsplash"
      >
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            href="/request"
            className="tg-link-on-dark inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-6 py-3.5 text-sm font-bold text-white hover:bg-teal-400 sm:w-auto sm:py-3"
          >
            Request a quote
          </Link>
          <Link
            href="/work"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:border-white sm:w-auto sm:py-3"
          >
            See selected work
          </Link>
        </div>
      </SceneryHero>

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-10">
          <Proof
            title="Written scope first"
            body="Price and timeline on paper before any paid hour."
          />
          <Proof
            title="Reusable deliverables"
            body="Plates, layers, methods note — formats your team already opens."
          />
          <Proof
            title="Proven on African cities"
            body="Access, heat, healthcare pressure, and publication cartography shipped."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-sea">
              Selected work
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
              Outcomes, not mood boards
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 text-sm font-bold text-sea"
          >
            All work →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {featuredWork.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-sm transition hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={asset(c.thumb)}
                  alt={`Map plate — ${c.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-sea">
                  {c.tags[0]}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold text-ink group-hover:text-sea">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{c.place}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {c.outcome}
                </p>
                <p className="mt-4 text-sm font-bold text-ink">{c.priceNote}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SceneryBand
        src="/scenery/mountain-light.jpg"
        alt="Sunlit mountain ridge above a valley"
        title="Four steps. No big reveal at the end."
        body="Brief → written quote → draft while time remains → files you own. The process is the same whether you need one plate or a multi-city panel."
        credit="Photo via Unsplash"
      >
        <ol className="grid w-full gap-3 sm:grid-cols-2 sm:gap-4">
          {PROCESS.map((step) => (
            <li
              key={step.n}
              className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm sm:p-4"
            >
              <p className="font-display text-sm font-bold text-teal-300">
                {step.n}
              </p>
              <h3 className="mt-1 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </SceneryBand>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-sea">
              Services
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
              Packages with clear tiers
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Brief · Standard · Deep dive. Starting prices in USD; final quote
              after your AOI is clear.
            </p>
          </div>
          <Link
            href="/analysis"
            className="shrink-0 text-sm font-bold text-sea"
          >
            All services →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
          {featuredServices.map((p) => (
            <Link
              key={p.slug}
              href={`/analysis/${p.slug}`}
              className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--line)] bg-card p-5 shadow-sm transition hover:border-sea"
            >
              <div>
                <h3 className="font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>
              </div>
              <p className="shrink-0 text-sm font-bold text-sea">
                From ${p.tiers[0].priceFromUsd}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image
          src={asset("/scenery/city-dusk.jpg")}
          alt="City lights at dusk"
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-slate-950/80" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              About
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white">
              A surveyor who ships maps people can argue with.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200">
              BSc Geoinformatics &amp; Surveying, University of Uyo. Surveyor at
              Geomatics Consult since 2020. NASRDA GIS/RS service year. Day tools:
              QGIS (including headless plates), Python (GeoPandas, Rasterio,
              GDAL), ArcGIS, Earth Engine–backed layers, MapLibre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://linkedin.com/in/wisdom-akpabio-geospatial"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/whizialfa"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
            <p className="mt-6 text-[11px] text-slate-400">Photo via Unsplash</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
            <p className="text-sm font-semibold text-teal-300">Retainer</p>
            <p className="font-display mt-2 text-3xl font-bold text-white">
              ${RETAINER.priceFromUsd}
              <span className="text-lg font-medium text-slate-300"> / month</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {RETAINER.blurb}
            </p>
            <Link
              href="/request?kind=retainer"
              className="mt-6 inline-flex items-center justify-center tg-link-on-light rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:opacity-90"
            >
              Ask about a retainer
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-sm sm:grid sm:grid-cols-2 sm:rounded-3xl">
          <div className="relative min-h-[180px] sm:min-h-full">
            <Image
              src={asset("/scenery/green-hills.jpg")}
              alt="Green rolling hills under soft light"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-6 sm:p-10 md:p-12">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
              Tell me what you need mapped.
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Custom analysis, a sibling of a ready study, or a publication plate.
              You get a written fee before anything starts.
            </p>
            <Link
              href="/request"
              className="tg-link-on-dark mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:opacity-90 sm:mt-8 sm:w-auto sm:py-3"
            >
              Open the request box
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Proof({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
    </div>
  );
}
