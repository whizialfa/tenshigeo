import type { Map as MapLibreMap } from "maplibre-gl";
import { EDITIONS } from "./editions";
import type { EditionId } from "./types";

/** Force TenshiGeo edition colours onto a live MapLibre style. */
export function applyEditionToMap(map: MapLibreMap, editionId: EditionId) {
  const edition = EDITIONS[editionId];
  const layers = map.getStyle()?.layers ?? [];

  for (const layer of layers) {
    const id = layer.id;
    const lower = id.toLowerCase();
    const type = layer.type;

    try {
      if (type === "background") {
        map.setPaintProperty(id, "background-color", edition.land);
        continue;
      }

      if (
        lower.includes("water") ||
        lower.includes("ocean") ||
        lower.includes("river") ||
        lower.includes("lake")
      ) {
        if (type === "fill") map.setPaintProperty(id, "fill-color", edition.water);
        if (type === "line") map.setPaintProperty(id, "line-color", edition.water);
        continue;
      }

      if (
        lower.includes("park") ||
        lower.includes("wood") ||
        lower.includes("grass") ||
        lower.includes("landcover") ||
        lower.includes("landuse")
      ) {
        if (type === "fill") map.setPaintProperty(id, "fill-color", edition.park);
        continue;
      }

      if (lower.includes("building")) {
        if (type === "fill") {
          map.setPaintProperty(id, "fill-color", edition.building);
          map.setPaintProperty(id, "fill-opacity", 0.85);
        }
        continue;
      }

      if (
        lower.includes("motorway") ||
        lower.includes("trunk") ||
        lower.includes("primary")
      ) {
        if (type === "line") {
          map.setPaintProperty(id, "line-color", edition.majorRoad);
          map.setPaintProperty(id, "line-opacity", 1);
        }
        continue;
      }

      if (
        lower.includes("road") ||
        lower.includes("street") ||
        lower.includes("path") ||
        lower.includes("bridge") ||
        lower.includes("tunnel") ||
        lower.includes("highway") ||
        lower.includes("transportation") ||
        lower.includes("railway")
      ) {
        if (type === "line") {
          map.setPaintProperty(id, "line-color", edition.road);
          map.setPaintProperty(id, "line-opacity", 0.95);
        }
        continue;
      }

      // Place / street / POI labels — always readable (no wait-for-hover)
      if (
        type === "symbol" ||
        lower.includes("label") ||
        lower.includes("place") ||
        lower.includes("housenumber") ||
        lower.includes("poi") ||
        lower.includes("name")
      ) {
        if (type === "symbol") {
          map.setLayoutProperty(id, "visibility", "visible");
          map.setPaintProperty(id, "text-color", edition.label);
          map.setPaintProperty(id, "text-opacity", 1);
          map.setPaintProperty(id, "text-halo-color", edition.paper);
          map.setPaintProperty(id, "text-halo-width", 1.6);
          map.setPaintProperty(id, "text-halo-blur", 0.4);
          map.setPaintProperty(id, "icon-opacity", 1);
        }
        continue;
      }

      if (lower.includes("land") || lower.includes("earth")) {
        if (type === "fill") map.setPaintProperty(id, "fill-color", edition.land);
      }
    } catch {
      /* skip unsupported paint props */
    }
  }
}
