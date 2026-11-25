import Image from "next/image";
import { asset } from "@/lib/asset";

type Props = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  credit?: string;
  children?: React.ReactNode;
  /** Shorter band for secondary pages */
  compact?: boolean;
};

/** Full-bleed Unsplash / local scenery with readable overlay. */
export function SceneryHero({
  src,
  alt,
  eyebrow,
  title,
  body,
  credit = "Photo via Unsplash",
  children,
  compact,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
      <Image
        src={asset(src)}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        unoptimized
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/72 to-slate-950/45"
        aria-hidden
      />
      <div
        className={`relative mx-auto max-w-6xl px-4 sm:px-6 ${
          compact ? "py-16 sm:py-20" : "py-20 sm:py-28"
        }`}
      >
        {eyebrow ? (
          <p className="tg-rise text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`tg-rise font-display max-w-3xl font-bold leading-[1.15] text-white ${
            compact ? "mt-3 text-3xl sm:text-4xl" : "mt-4 text-4xl sm:text-6xl"
          }`}
        >
          {title}
        </h1>
        {body ? (
          <p className="tg-rise-delay mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {body}
          </p>
        ) : null}
        {children ? <div className="tg-rise-delay mt-8">{children}</div> : null}
        <p className="mt-10 text-[11px] tracking-wide text-slate-400">{credit}</p>
      </div>
    </section>
  );
}
