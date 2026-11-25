import Link from "next/link";
import { READY_MADE } from "@/lib/services";

export const metadata = {
 title: "Ready-made maps",
};

export default function ReadyMapsPage() {
 return (
  <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
   <p className="text-sm font-semibold uppercase tracking-wide text-sea">
    Licence packs
   </p>
   <h1 className="font-display mt-2 text-4xl font-bold text-ink">
    Ready-made maps
   </h1>
   <p className="mt-3 max-w-2xl text-lg text-ink-soft">
    Finished geospatial products — licence the pack, or ask for the same
    method on your city. Decorative street prints live in the print studio.
   </p>

   <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {READY_MADE.map((m) => (
     <article key={m.slug} className="rounded-2xl border border-[var(--line)] bg-card shadow-sm flex flex-col rounded-2xl p-5">
      <p className="text-xs font-bold text-sea">${m.priceUsd} pack</p>
      <h2 className="font-display mt-2 text-lg font-bold text-ink">
       {m.title}
      </h2>
      <p className="mt-1 text-sm text-muted">{m.place}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
       {m.blurb}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
       {m.tags.map((t) => (
        <span
         key={t}
         className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] font-semibold text-ink-soft"
        >
         {t}
        </span>
       ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-4">
       {m.href && (
        <a
         href={m.href}
         target="_blank"
         rel="noreferrer"
         className="text-sm font-bold text-sea"
        >
         Preview →
        </a>
       )}
       <Link
        href={`/request?ready=${m.slug}`}
        className="text-sm font-bold text-ink"
       >
        Licence / adapt →
       </Link>
      </div>
     </article>
    ))}
   </div>

   <p className="mt-12 text-sm text-ink-soft">
    Prefer decorative city street art?{" "}
    <Link href="/studio" className="font-bold text-sea">
     Open the print studio
    </Link>
    .
   </p>
  </div>
 );
}
