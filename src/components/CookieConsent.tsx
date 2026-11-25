"use client";

import { useEffect, useState } from "react";

const KEY = "tenshigeo-consent";

export function CookieConsent() {
 const [open, setOpen] = useState(false);

 useEffect(() => {
  if (!localStorage.getItem(KEY)) setOpen(true);
 }, []);

 if (!open) return null;

 return (
  <div className="fixed inset-x-0 bottom-0 z-50 p-4">
   <div className="rounded-2xl border border-[var(--line)] bg-card shadow-sm mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-ink-soft">
     TenshiGeo uses optional analytics only after you consent. Cart and
     checkout essentials always run.
    </p>
    <div className="flex shrink-0 gap-2">
     <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-sea px-4 py-2"
      onClick={() => {
       localStorage.setItem(KEY, "denied");
       setOpen(false);
      }}
     >
      Essential only
     </button>
     <button
      type="button"
      className="rounded-full bg-sea px-4 py-2 text-sm font-bold text-white"
      onClick={() => {
       localStorage.setItem(KEY, "granted");
       setOpen(false);
      }}
     >
      Accept
     </button>
    </div>
   </div>
  </div>
 );
}
