"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EDITION_LIST } from "@/lib/editions";
import { SIZE_LIST } from "@/lib/sizes";
import { priceForDesign, useCart } from "@/lib/cart";
import type { StudioDesign } from "@/lib/types";
import { RoomPreview } from "@/components/RoomPreview";

const MapCanvas = dynamic(
 () => import("./MapCanvas").then((m) => m.MapCanvas),
 { ssr: false, loading: () => <div className="h-full animate-pulse bg-mist/50" /> },
);

const STEPS = ["Place", "Style", "Words", "Size"] as const;
const SAVE_KEY = "tenshigeo-studio-design";

type Props = {
 initial: StudioDesign;
 priceUsd?: number;
 productLabel?: string;
};

export function StudioEditor({ initial, priceUsd, productLabel }: Props) {
 const [design, setDesign] = useState<StudioDesign>(initial);
 const [step, setStep] = useState(0);
 const [query, setQuery] = useState(initial.placeName);
 const [searching, setSearching] = useState(false);
 const [results, setResults] = useState<
  { display_name: string; lat: string; lon: string }[]
 >([]);
 const captureRef = useRef<(() => string | null) | null>(null);
 const { addItem } = useCart();
 const router = useRouter();
 const [mapReady, setMapReady] = useState(false);

 useEffect(() => {
  setMapReady(true);
 }, []);

 useEffect(() => {
  try {
   localStorage.setItem(SAVE_KEY, JSON.stringify(design));
  } catch {
   /* ignore */
  }
 }, [design]);

 const price = useMemo(
  () => priceUsd ?? priceForDesign(design),
  [design, priceUsd],
 );

 const search = useCallback(async () => {
  if (!query.trim()) return;
  setSearching(true);
  try {
   const res = await fetch(
    `/api/geocode?q=${encodeURIComponent(query.trim())}`,
   );
   const data = (await res.json()) as {
    results: { display_name: string; lat: string; lon: string }[];
   };
   setResults(data.results ?? []);
  } finally {
   setSearching(false);
  }
 }, [query]);

 const applyPlace = (r: { display_name: string; lat: string; lon: string }) => {
  const name = r.display_name.split(",")[0] ?? r.display_name;
  setDesign((d) => ({
   ...d,
   placeName: name,
   lat: Number(r.lat),
   lon: Number(r.lon),
   words: {
    ...d.words,
    title: name.toUpperCase(),
    subtitle: r.display_name.split(",").slice(1, 3).join(",").trim() || d.words.subtitle,
   },
  }));
  setQuery(name);
  setResults([]);
 };

 const addToBag = () => {
  const mapDataUrl = captureRef.current?.() ?? undefined;
  addItem({
   design,
   priceUsd: price,
   label: productLabel ?? `${design.placeName} — ${design.editionId}`,
   mapDataUrl,
  });
  router.push("/bag");
 };

 return (
  <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:gap-6 sm:py-8 lg:grid-cols-[1.2fr_0.9fr] lg:px-6">
   <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-card shadow-sm">
    <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-3 sm:px-4">
     <p className="text-sm font-semibold text-ink">Live artwork</p>
     <p className="text-xs text-ink-soft">Pan · zoom · rotate</p>
    </div>
    <div className="h-[min(58vw,320px)] sm:h-[420px] md:h-[560px]">
     {mapReady ? (
      <MapCanvas
       design={design}
       onViewChange={(v) =>
        setDesign((d) => ({ ...d, ...v }))
       }
       onReady={(api) => {
        captureRef.current = api.capture;
       }}
       className="h-full w-full"
      />
     ) : (
      <div className="h-full animate-pulse bg-mist/50" />
     )}
    </div>
    <div className="border-t border-[var(--line)] bg-fog px-4 py-3">
     <p className="font-display text-xl font-bold tracking-wide text-ink">
      {design.words.title}
     </p>
     <p className="text-sm text-ink-soft">{design.words.subtitle}</p>
     <p className="mt-1 text-xs font-medium text-sea">{design.words.footer}</p>
    </div>
   </div>

   <div className="space-y-5">
    <div className="flex gap-1 rounded-full bg-card p-1 border border-[var(--line)]">
     {STEPS.map((s, i) => (
      <button
       key={s}
       type="button"
       onClick={() => setStep(i)}
       className={`flex-1 rounded-full px-2 py-2 text-xs font-semibold sm:text-sm ${
        step === i ? "bg-slate-950 text-white" : "text-ink-soft hover:text-ink"
       }`}
      >
       {s}
      </button>
     ))}
    </div>

    <div className="rounded-2xl border border-[var(--line)] bg-card p-5">
     {step === 0 && (
      <div className="space-y-3">
       <h2 className="font-display text-lg font-bold">Place</h2>
       <p className="text-sm text-ink-soft">
        Search a city or paste coordinates.
       </p>
       <div className="flex gap-2">
        <input
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         onKeyDown={(e) => e.key === "Enter" && search()}
         className="flex-1 rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm outline-none focus:border-sea"
         placeholder="Lagos, London, Tokyo…"
        />
        <button
         type="button"
         onClick={search}
         disabled={searching}
         className="rounded-xl bg-sea px-4 py-2 text-sm font-semibold text-white"
        >
         {searching ? "…" : "Search"}
        </button>
       </div>
       {results.length > 0 && (
        <ul className="max-h-40 overflow-auto rounded-xl border border-[var(--line)] text-sm">
         {results.map((r) => (
          <li key={`${r.lat}-${r.lon}-${r.display_name}`}>
           <button
            type="button"
            className="block w-full px-3 py-2 text-left hover:bg-fog"
            onClick={() => applyPlace(r)}
           >
            {r.display_name}
           </button>
          </li>
         ))}
        </ul>
       )}
       <div className="grid grid-cols-2 gap-2">
        <label className="text-xs text-ink-soft">
         Latitude
         <input
          type="number"
          step="any"
          value={design.lat}
          onChange={(e) =>
           setDesign((d) => ({ ...d, lat: Number(e.target.value) }))
          }
          className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
         />
        </label>
        <label className="text-xs text-ink-soft">
         Longitude
         <input
          type="number"
          step="any"
          value={design.lon}
          onChange={(e) =>
           setDesign((d) => ({ ...d, lon: Number(e.target.value) }))
          }
          className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
         />
        </label>
       </div>
      </div>
     )}

     {step === 1 && (
      <div className="space-y-3">
       <h2 className="font-display text-lg font-bold">Style</h2>
       <p className="text-sm text-ink-soft">Seven colour editions.</p>
       <div className="grid grid-cols-1 gap-2">
        {EDITION_LIST.map((ed) => (
         <button
          key={ed.id}
          type="button"
          onClick={() =>
           setDesign((d) => ({ ...d, editionId: ed.id }))
          }
          className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left ${
           design.editionId === ed.id
            ? "border-sea bg-sea/10"
            : "border-[var(--line)] hover:bg-fog"
          }`}
         >
          <span
           className="flex h-10 w-10 overflow-hidden rounded-lg"
           aria-hidden
          >
           <span className="w-1/3" style={{ background: ed.land }} />
           <span className="w-1/3" style={{ background: ed.road }} />
           <span className="w-1/3" style={{ background: ed.water }} />
          </span>
          <span>
           <span className="block text-sm font-semibold">{ed.name}</span>
           <span className="text-xs text-ink-soft">{ed.tagline}</span>
          </span>
         </button>
        ))}
       </div>
      </div>
     )}

     {step === 2 && (
      <div className="space-y-3">
       <h2 className="font-display text-lg font-bold">Words</h2>
       <label className="block text-xs text-ink-soft">
        Title
        <input
         value={design.words.title}
         onChange={(e) =>
          setDesign((d) => ({
           ...d,
           words: { ...d.words, title: e.target.value },
          }))
         }
         className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
        />
       </label>
       <label className="block text-xs text-ink-soft">
        Subtitle
        <input
         value={design.words.subtitle}
         onChange={(e) =>
          setDesign((d) => ({
           ...d,
           words: { ...d.words, subtitle: e.target.value },
          }))
         }
         className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
        />
       </label>
       <label className="block text-xs text-ink-soft">
        Footer line
        <input
         value={design.words.footer}
         onChange={(e) =>
          setDesign((d) => ({
           ...d,
           words: { ...d.words, footer: e.target.value },
          }))
         }
         className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
        />
       </label>
      </div>
     )}

     {step === 3 && (
      <div className="space-y-3">
       <h2 className="font-display text-lg font-bold">Size</h2>
       <div className="grid grid-cols-2 gap-2">
        {SIZE_LIST.map((s) => (
         <button
          key={s.id}
          type="button"
          onClick={() => setDesign((d) => ({ ...d, sizeId: s.id }))}
          className={`rounded-xl border px-3 py-3 text-left text-sm ${
           design.sizeId === s.id
            ? "border-sea bg-sea/10 font-semibold"
            : "border-[var(--line)]"
          }`}
         >
          {s.label}
         </button>
        ))}
       </div>
      </div>
     )}
    </div>

    <RoomPreview design={design} />

    <div className="flex items-center justify-between bg-slate-950 text-white rounded-2xl border border-[var(--line)] px-5 py-4">
     <div>
      <p className="text-xs text-[#cbd5e1]">Digital PDF + PNG</p>
      <p className="font-display text-2xl font-bold text-white">${price}</p>
     </div>
     <button
      type="button"
      onClick={addToBag}
      className="rounded-full bg-[#2dd4bf] px-5 py-3 text-sm font-bold text-slate-950"
     >
      Add to bag
     </button>
    </div>
    <p className="text-xs text-ink-soft">
     Design auto-saves in this browser. Personal use licence. OSM attribution kept on export.
    </p>
   </div>
  </div>
 );
}
