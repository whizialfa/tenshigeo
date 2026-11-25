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
          compact ? "py-12 sm:py-16 md:py-20" : "py-14 sm:py-20 md:py-28"
        }`}
      >
        {eyebrow ? (
          <p className="tg-rise text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300 sm:text-sm sm:tracking-[0.16em]">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`tg-rise font-display max-w-3xl text-balance font-bold leading-[1.15] text-white ${
            compact
              ? "mt-3 text-2xl sm:text-3xl md:text-4xl"
              : "mt-3 text-[1.75rem] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          }`}
        >
          {title}
        </h1>
        {body ? (
          <p className="tg-rise-delay mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-200 sm:mt-5 sm:text-base md:text-lg">
            {body}
          </p>
        ) : null}
        {children ? (
          <div className="tg-rise-delay mt-6 sm:mt-8">{children}</div>
        ) : null}
        <p className="mt-8 text-[11px] tracking-wide text-slate-400 sm:mt-10">
          {credit}
        </p>
      </div>
    </section>
  );
}
