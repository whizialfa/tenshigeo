"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { applyEditionToMap } from "@/lib/applyEdition";
import { OPENFREEMAP_STYLE } from "@/lib/mapStyle";
import type { EditionId, StudioDesign } from "@/lib/types";

type Props = {
 design: StudioDesign;
 onViewChange?: (v: {
  lat: number;
  lon: number;
  zoom: number;
  bearing: number;
 }) => void;
 onReady?: (api: { capture: () => string | null }) => void;
 className?: string;
};

export function MapCanvas({ design, onViewChange, onReady, className }: Props) {
 const containerRef = useRef<HTMLDivElement>(null);
 const mapRef = useRef<MapLibreMap | null>(null);
 const editionRef = useRef<EditionId>(design.editionId);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  if (!containerRef.current || mapRef.current) return;

  try {
   // Ensure MapLibre worker resolves under Next.js bundling
   maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

   const map = new maplibregl.Map({
    container: containerRef.current,
    style: OPENFREEMAP_STYLE,
    center: [design.lon, design.lat],
    zoom: design.zoom,
    bearing: design.bearing,
    attributionControl: { compact: true },
    pitch: 0,
    maxPitch: 0,
   });

   map.addControl(
    new maplibregl.NavigationControl({ visualizePitch: false }),
    "top-right",
   );
   mapRef.current = map;

   map.on("moveend", () => {
    const c = map.getCenter();
    onViewChange?.({
     lat: c.lat,
     lon: c.lng,
     zoom: map.getZoom(),
     bearing: map.getBearing(),
    });
   });

   const paint = () => {
    try {
     applyEditionToMap(map, editionRef.current);
    } catch (err) {
     console.warn("edition paint", err);
    }
    map.resize();
    map.triggerRepaint();
   };

   map.on("load", () => {
    // Defer paint so vector sources finish wiring
    requestAnimationFrame(() => paint());
    onReady?.({
     capture: () => {
      try {
       // MapLibre needs preserveDrawingBuffer for capture — enable briefly
       return map.getCanvas().toDataURL("image/png");
      } catch {
       return null;
      }
     },
    });
   });

   map.on("idle", () => {
    // one-shot ensure colours after first tiles
    if (!(map as unknown as { __tgPainted?: boolean }).__tgPainted) {
     (map as unknown as { __tgPainted?: boolean }).__tgPainted = true;
     paint();
    }
   });
  } catch (e) {
   setError(e instanceof Error ? e.message : "Map failed to load");
  }

  return () => {
   mapRef.current?.remove();
   mapRef.current = null;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
  editionRef.current = design.editionId;
  const map = mapRef.current;
  if (!map || !map.isStyleLoaded()) return;
  applyEditionToMap(map, design.editionId);
 }, [design.editionId]);

 useEffect(() => {
  const map = mapRef.current;
  if (!map) return;
  const c = map.getCenter();
  if (
   Math.abs(c.lat - design.lat) > 0.0001 ||
   Math.abs(c.lng - design.lon) > 0.0001
  ) {
   map.flyTo({
    center: [design.lon, design.lat],
    zoom: design.zoom,
    bearing: design.bearing,
    essential: true,
   });
  }
 }, [design.lat, design.lon, design.zoom, design.bearing]);

 return (
  <div className={`relative overflow-hidden ${className ?? ""}`}>
   <div ref={containerRef} className="h-full w-full bg-[#d7e2ea]" />
   {error && (
    <div className="absolute inset-0 flex items-center justify-center bg-fog p-6 text-center text-sm text-ink-soft">
     {error}
    </div>
   )}
  </div>
 );
}
