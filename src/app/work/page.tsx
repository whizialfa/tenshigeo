import Image from "next/image";
import Link from "next/link";
import { SceneryHero } from "@/components/SceneryHero";
import { asset } from "@/lib/asset";
import { CASE_STUDIES } from "@/lib/work";

export const metadata = {
  title: "Selected work",
};

export default function WorkPage() {
  return (
    <div>
      <SceneryHero
        src="/scenery/earth-orbit.jpg"
        alt="Earth from orbit with sunlit continents"
        eyebrow="Portfolio"
        title="Selected work"
        body="Real places, real metrics, publication furniture. Each case links to an adaptable package if you need the same method elsewhere."
        credit="Photo via Unsplash"
        compact
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-sm transition hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                <Image
                  src={asset(c.thumb)}
                  alt={`Map plate — ${c.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display mt-4 text-2xl font-bold text-ink group-hover:text-sea">
                  {c.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{c.place}</p>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {c.outcome}
                </p>
                <p className="mt-4 text-sm font-bold text-sea">{c.priceNote} →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
