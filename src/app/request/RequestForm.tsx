"use client";

import { useState } from "react";

type Props = {
 packages: { slug: string; name: string }[];
 readyMaps: { slug: string; title: string }[];
 initialPackage?: string;
 initialReady?: string;
};

export function RequestForm({
 packages,
 readyMaps,
 initialPackage,
 initialReady,
}: Props) {
 const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
  "idle",
 );
 const [token, setToken] = useState<string | null>(null);
 const [error, setError] = useState<string | null>(null);

 async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("sending");
  setError(null);
  const fd = new FormData(e.currentTarget);
  const body = Object.fromEntries(fd.entries());
  try {
   const res = await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
   });
   const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
   if (!res.ok) throw new Error(data.error || "Send failed");
   setToken(data.id ?? null);
   setStatus("sent");
   e.currentTarget.reset();
  } catch (err) {
   setError(err instanceof Error ? err.message : "Send failed");
   setStatus("error");
  }
 }

 if (status === "sent") {
  return (
   <div className="border border-[var(--line)] bg-card mt-8 rounded-2xl p-6">
    <p className="font-display text-2xl font-bold text-ink">Request received</p>
    <p className="mt-2 text-sm text-ink-soft">
     Reference <strong>{token}</strong>. I will reply to your email with a
     written scope and fee. For urgency, email{" "}
     <a className="text-sea" href="mailto:wisdomakpabio27@gmail.com">
      wisdomakpabio27@gmail.com
     </a>
     .
    </p>
   </div>
  );
 }

 return (
  <form
   onSubmit={onSubmit}
   className="mt-8 space-y-4 rounded-2xl border border-[var(--line)] bg-card p-4 sm:p-6"
  >
   <label className="block text-xs font-semibold text-ink-soft">
    Your name
    <input
     required
     name="name"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    />
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Email
    <input
     required
     type="email"
     name="email"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    />
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    What do you need?
    <select
     name="kind"
     defaultValue="analysis"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    >
     <option value="analysis">Geospatial analysis</option>
     <option value="map-print">Custom map / print plate</option>
     <option value="ready">Licence / adapt a ready-made map</option>
     <option value="web">Interactive web map</option>
     <option value="retainer">Monthly retainer</option>
     <option value="other">Something else</option>
    </select>
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Package (optional)
    <select
     name="packageSlug"
     defaultValue={initialPackage ?? ""}
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    >
     <option value="">Not sure yet</option>
     {packages.map((p) => (
      <option key={p.slug} value={p.slug}>
       {p.name}
      </option>
     ))}
    </select>
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Ready-made map (optional)
    <select
     name="readySlug"
     defaultValue={initialReady ?? ""}
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    >
     <option value="">None</option>
     {readyMaps.map((m) => (
      <option key={m.slug} value={m.slug}>
       {m.title}
      </option>
     ))}
    </select>
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Place / AOI
    <input
     name="place"
     placeholder="e.g. Kano metropolis, or lat/lon bbox"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    />
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Budget band (USD, optional)
    <select
     name="budget"
     defaultValue=""
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    >
     <option value="">Prefer a recommendation</option>
     <option value="under-400">Under $400</option>
     <option value="400-900">$400 – $900</option>
     <option value="900-2000">$900 – $2,000</option>
     <option value="2000-plus">$2,000+</option>
    </select>
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Deadline
    <input
     name="deadline"
     placeholder="e.g. 18 Dec 2026, or flexible"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    />
   </label>
   <label className="block text-xs font-semibold text-ink-soft">
    Describe the question
    <textarea
     required
     name="message"
     rows={5}
     placeholder="What decision should the map or analysis support? What data do you already have?"
     className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm text-ink outline-none focus:border-sea"
    />
   </label>

   {error && <p className="text-sm text-red-600">{error}</p>}

   <button
    type="submit"
    disabled={status === "sending"}
    className="w-full rounded-full bg-sea py-3 text-sm font-bold text-white disabled:opacity-60"
   >
    {status === "sending" ? "Sending…" : "Send request"}
   </button>
   <p className="text-[11px] text-ink-soft">
    Submitting stores your request on this site and is not a payment. A fee
    is agreed in writing before work begins.
   </p>
  </form>
 );
}
