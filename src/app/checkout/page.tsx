"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
 const { items, totalUsd, clear } = useCart();
 const [email, setEmail] = useState("");
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const router = useRouter();

 if (items.length === 0) {
  return (
   <div className="mx-auto max-w-lg px-4 py-16 text-center">
    <h1 className="font-display text-3xl font-bold">Checkout</h1>
    <p className="mt-3 text-ink-soft">Nothing in your bag.</p>
    <Link href="/collections" className="mt-4 inline-block text-sea font-semibold">
     Shop maps →
    </Link>
   </div>
  );
 }

 const pay = async (mode: "demo" | "paypal") => {
  setBusy(true);
  setError(null);
  try {
   const res = await fetch("/api/checkout/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, email, mode }),
   });
   const data = (await res.json()) as {
    ok?: boolean;
    token?: string;
    approveUrl?: string;
    error?: string;
   };
   if (!res.ok) throw new Error(data.error || "Checkout failed");

   if (data.approveUrl) {
    window.location.href = data.approveUrl;
    return;
   }
   if (data.token) {
    clear();
    router.push(`/order/${data.token}`);
   }
  } catch (e) {
   setError(e instanceof Error ? e.message : "Checkout failed");
  } finally {
   setBusy(false);
  }
 };

 return (
  <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
   <h1 className="font-display text-4xl font-bold">Checkout</h1>
   <p className="mt-2 text-sm text-ink-soft">
    No account needed. You get a private link to re-download your files.
   </p>

   <div className="mt-8 rounded-2xl border border-[var(--line)] bg-card p-5">
    <p className="text-sm text-ink-soft">{items.length} item(s)</p>
    <p className="font-display text-3xl font-bold">${totalUsd}</p>

    <label className="mt-6 block text-xs text-ink-soft">
     Email (optional — for your records)
     <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm"
      placeholder="you@example.com"
     />
    </label>

    {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

    <button
     type="button"
     disabled={busy}
     onClick={() => pay("demo")}
     className="mt-6 w-full rounded-full bg-sea py-3 text-sm font-bold text-white disabled:opacity-60"
    >
     {busy ? "Working…" : "Complete demo checkout"}
    </button>
    <p className="mt-2 text-center text-[11px] text-ink-soft">
     Demo fulfills instantly without PayPal credentials. Set{" "}
     <code className="rounded bg-fog px-1">PAYPAL_CLIENT_ID</code> to enable
     sandbox PayPal.
    </p>

    <button
     type="button"
     disabled={busy}
     onClick={() => pay("paypal")}
     className="mt-3 w-full rounded-full border border-[var(--line)] bg-white py-3 text-sm font-semibold disabled:opacity-60"
    >
     Pay with PayPal
    </button>
   </div>
  </div>
 );
}
