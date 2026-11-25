"use client";

import { EDITIONS } from "@/lib/editions";
import type { StudioDesign } from "@/lib/types";

export function RoomPreview({
 design,
 mapDataUrl,
}: {
 design: StudioDesign;
 mapDataUrl?: string | null;
}) {
 const edition = EDITIONS[design.editionId];

 return (
  <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[#cfc6b8]">
   <div className="absolute inset-0 bg-[linear-gradient(180deg,#ddd4c6,#b9b0a2)]" />
   {/* wall + floor suggestion */}
   <div className="relative flex min-h-[280px] items-center justify-center p-8 sm:min-h-[360px]">
    <div className="absolute inset-x-0 bottom-0 h-16 bg-[#8f8578]" />
    <div
     className="tg-float relative z-10 w-[42%] max-w-[220px] shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
     style={{ background: edition.paper }}
    >
     <div className="border-[10px] border-[#2a2218] bg-white p-2">
      {mapDataUrl ? (
       // eslint-disable-next-line @next/next/no-img-element
       <img src={mapDataUrl} alt="Framed preview" className="aspect-[4/5] w-full object-cover" />
      ) : (
       <div
        className="aspect-[4/5] w-full"
        style={{ background: edition.land }}
       >
        <div className="flex h-full flex-col justify-end p-3">
         <p
          className="font-display text-sm font-bold"
          style={{ color: edition.label }}
         >
          {design.words.title}
         </p>
         <p className="text-[10px]" style={{ color: edition.accent }}>
          {design.words.subtitle}
         </p>
        </div>
       </div>
      )}
     </div>
    </div>
   </div>
   <p className="relative z-10 px-4 pb-3 text-center text-[11px] text-muted">
    Room preview — digital file only; frame not included
   </p>
  </div>
 );
}
