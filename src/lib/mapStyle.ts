import { EDITIONS } from "./editions";
import type { EditionId } from "./types";

/** OpenFreeMap liberty style — OSM via OpenMapTiles */
export const OPENFREEMAP_STYLE =
  "https://tiles.openfreemap.org/styles/liberty";

type StyleLayer = {
  id: string;
  type?: string;
  paint?: Record<string, unknown>;
  layout?: Record<string, unknown>;
};

type MapStyle = {
  layers: StyleLayer[];
  [key: string]: unknown;
};

function colorForLayer(id: string, type: string | undefined, edition: (typeof EDITIONS)[EditionId]) {
  const lower = id.toLowerCase();
  if (type === "background" || lower === "background") return edition.land;
  if (lower.includes("water") || lower.includes("ocean") || lower.includes("river") || lower.includes("lake")) {
    return edition.water;
  }
  if (
    lower.includes("park") ||
    lower.includes("wood") ||
    lower.includes("grass") ||
    lower.includes("landcover") ||
    lower.includes("landuse")
  ) {
    return edition.park;
  }
  if (lower.includes("building")) return edition.building;
  if (
    lower.includes("motorway") ||
    lower.includes("trunk") ||
    lower.includes("primary")
  ) {
    return edition.majorRoad;
  }
  if (
    lower.includes("road") ||
    lower.includes("street") ||
    lower.includes("path") ||
    lower.includes("bridge") ||
    lower.includes("tunnel") ||
    lower.includes("highway") ||
    lower.includes("transportation")
  ) {
    return edition.road;
  }
  if (lower.includes("label") || lower.includes("place") || lower.includes("housenumber")) {
    return edition.label;
  }
  if (lower.includes("land") || lower.includes("earth") || lower.includes("landcover")) {
    return edition.land;
  }
  return null;
}

/**
 * Recolor an OpenFreeMap style into a TenshiGeo edition.
 * Only replaces simple string paint values so expressions stay intact.
 */
export function recolorStyle(style: MapStyle, editionId: EditionId): MapStyle {
  const edition = EDITIONS[editionId];
  const layers = style.layers.map((layer) => {
    const paint = { ...(layer.paint ?? {}) };
    const color = colorForLayer(layer.id, layer.type, edition);
    if (!color) return { ...layer, paint };

    const keys = [
      "background-color",
      "fill-color",
      "line-color",
      "text-color",
      "circle-color",
    ] as const;

    for (const key of keys) {
      if (key in paint && typeof paint[key] === "string") {
        paint[key] = color;
      }
    }

    if (layer.type === "background") {
      paint["background-color"] = edition.land;
    }

    if ("text-halo-color" in paint && typeof paint["text-halo-color"] === "string") {
      paint["text-halo-color"] = edition.paper;
    }

    return { ...layer, paint };
  });

  return { ...style, layers };
}

export async function buildEditionStyle(editionId: EditionId) {
  const res = await fetch(OPENFREEMAP_STYLE);
  if (!res.ok) throw new Error("Failed to load base map style");
  const style = (await res.json()) as MapStyle;
  return recolorStyle(style, editionId);
}
