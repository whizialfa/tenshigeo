"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { EDITIONS } from "@/lib/editions";
import { SIZES } from "@/lib/sizes";

export default function BagPage() {
 const { items, removeItem, totalUsd, clear } = useCart();

 return (
  <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
   <h1 className="font-display text-4xl font-bold">Bag</h1>
   <p className="mt-2 text-sm text-ink-soft">
    Digital downloads only — nothing ships.
   </p>

   {items.length === 0 ? (
    <div className="mt-10 rounded-2xl border border-[var(--line)] bg-card p-10 text-center">
     <p className="text-ink-soft">Your bag is empty.</p>
     <Link
      href="/collections"
      className="mt-4 inline-block text-sm font-semibold text-sea"
     >
      Browse collections →
     </Link>
    </div>
   ) : (
    <div className="mt-8 space-y-4">
     {items.map((item) => {
      const ed = EDITIONS[item.design.editionId];
      return (
       <div
        key={item.id}
        className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--line)] bg-card p-4"
       >
        <div className="flex gap-3">
         <div
          className="h-16 w-12 rounded-lg"
          style={{ background: ed.land }}
         />
         <div>
          <p className="font-semibold">{item.label}</p>
          <p className="text-xs text-ink-soft">
           {ed.name} · {SIZES[item.design.sizeId].label}
          </p>
          <p className="mt-1 text-sm font-bold">${item.priceUsd}</p>
         </div>
        </div>
        <button
         type="button"
         className="text-xs font-semibold text-ink-soft hover:text-ink"
         onClick={() => removeItem(item.id)}
        >
         Remove
        </button>
       </div>
      );
     })}

     <div className="flex items-center justify-between border-t border-[var(--line)] pt-6">
      <button
       type="button"
       onClick={clear}
       className="text-xs font-semibold text-ink-soft"
      >
       Clear bag
      </button>
      <div className="text-right">
       <p className="text-xs text-ink-soft">Total</p>
       <p className="font-display text-3xl font-bold">${totalUsd}</p>
      </div>
     </div>

     <Link
      href="/checkout"
      className="bg-slate-950 text-white block rounded-full py-3.5 text-center text-sm font-bold"
     >
      Checkout
     </Link>
    </div>
   )}
  </div>
 );
}
