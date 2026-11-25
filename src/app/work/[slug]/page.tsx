import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCase } from "@/lib/work";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <div>
      <div className="relative isolate min-h-[280px] overflow-hidden border-b border-[var(--line)] sm:min-h-[380px]">
        <Image
          src={c.thumb}
          alt={`Map plate — ${c.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[280px] max-w-3xl flex-col justify-end px-4 py-10 sm:min-h-[380px] sm:px-6">
          <Link href="/work" className="text-sm font-bold text-teal-300">
            ← Selected work
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-2 text-slate-200">{c.place}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-sm text-ink-soft">{c.client}</p>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-sm">
          <Image
            src={c.thumb}
            alt={`Full map plate — ${c.title}`}
            width={1600}
            height={1200}
            className="h-auto w-full"
          />
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-wide text-sea">
            Outcome
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-ink">{c.outcome}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-sea">
            Problem
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">{c.problem}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-sea">
            Method
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">{c.method}</p>
        </section>

        <div className="mt-12 rounded-2xl border border-[var(--line)] bg-card p-6 shadow-sm">
          <p className="font-bold text-ink">{c.priceNote}</p>
          <p className="mt-2 text-sm text-ink-soft">
            Want this method on your city or dataset? Request a written quote.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/request?ready=${c.slug}`}
              className="inline-flex items-center justify-center tg-link-on-dark rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              Request this method
            </Link>
            {c.href && (
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-sea"
              >
                Open public map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
