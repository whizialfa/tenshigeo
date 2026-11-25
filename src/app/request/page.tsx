import { SceneryHero } from "@/components/SceneryHero";
import { ANALYSIS_PACKAGES, READY_MADE } from "@/lib/services";
import { RequestForm } from "./RequestForm";

export const metadata = {
  title: "Custom request",
};

export default function RequestPage() {
  return (
    <div>
      <SceneryHero
        src="/scenery/wetland.jpg"
        alt="Misty wetland and open sky"
        eyebrow="Hire"
        title="Request a quote"
        body="Custom maps, publication plates, geospatial analysis, or a sibling of a ready study. Written fee and timeline before work starts — usually within two working days."
        credit="Photo via Unsplash"
        compact
      />

      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <RequestForm
          packages={ANALYSIS_PACKAGES.map((p) => ({
            slug: p.slug,
            name: p.name,
          }))}
          readyMaps={READY_MADE.map((m) => ({ slug: m.slug, title: m.title }))}
        />
      </div>
    </div>
  );
}
