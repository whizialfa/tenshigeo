import { StudioEditor } from "@/components/studio/StudioEditor";
import { DESTINATIONS } from "@/lib/destinations";
import type { StudioDesign } from "@/lib/types";

export default function StudioPage() {
  const london = DESTINATIONS.find((d) => d.id === "london")!;
  const initial: StudioDesign = {
    placeName: london.name,
    lat: london.lat,
    lon: london.lon,
    zoom: london.zoom,
    bearing: 0,
    editionId: "midnight-gold",
    sizeId: "a3",
    words: {
      title: "LONDON",
      subtitle: "United Kingdom",
      footer: "TenshiGeo · OpenStreetMap",
    },
  };

  return (
    <div>
      <div className="border-b border-[var(--line)] bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-ink">
            Print studio
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Decorative city street prints — Place → Style → Words → Size.
            Separate from analysis packages.
          </p>
        </div>
      </div>
      <StudioEditor initial={initial} />
    </div>
  );
}
