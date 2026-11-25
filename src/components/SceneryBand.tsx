import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title: string;
  body: string;
  credit?: string;
  children?: React.ReactNode;
};

/** Mid-page scenery strip with copy overlay. */
export function SceneryBand({
  src,
  alt,
  title,
  body,
  credit = "Photo via Unsplash",
  children,
}: Props) {
  return (
    <section id="process" className="relative isolate scroll-mt-24 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-slate-950/75"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">{body}</p>
          <p className="mt-4 text-[11px] text-slate-400">{credit}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
