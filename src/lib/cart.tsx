"use client";

import {
 createContext,
 useCallback,
 useContext,
 useEffect,
 useMemo,
 useState,
} from "react";
import type { BagItem, StudioDesign } from "./types";
import { BASE_PRICE_USD } from "./catalog";

const STORAGE_KEY = "tenshigeo-bag";

type CartContextValue = {
 items: BagItem[];
 addItem: (item: Omit<BagItem, "id"> & { id?: string }) => void;
 removeItem: (id: string) => void;
 clear: () => void;
 count: number;
 totalUsd: number;
 ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function load(): BagItem[] {
 if (typeof window === "undefined") return [];
 try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as BagItem[];
 } catch {
  return [];
 }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
 const [items, setItems] = useState<BagItem[]>([]);
 const [ready, setReady] = useState(false);

 useEffect(() => {
  setItems(load());
  setReady(true);
 }, []);

 useEffect(() => {
  if (!ready) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
 }, [items, ready]);

 const addItem = useCallback(
  (item: Omit<BagItem, "id"> & { id?: string }) => {
   const id =
    item.id ??
    `bag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
   setItems((prev) => [...prev, { ...item, id }]);
  },
  [],
 );

 const removeItem = useCallback((id: string) => {
  setItems((prev) => prev.filter((i) => i.id !== id));
 }, []);

 const clear = useCallback(() => setItems([]), []);

 const value = useMemo(
  () => ({
   items,
   addItem,
   removeItem,
   clear,
   count: items.length,
   totalUsd: items.reduce((s, i) => s + i.priceUsd, 0),
   ready,
  }),
  [items, addItem, removeItem, clear, ready],
 );

 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
 const ctx = useContext(CartContext);
 if (!ctx) throw new Error("useCart must be used within CartProvider");
 return ctx;
}

export function priceForDesign(design: StudioDesign, base = BASE_PRICE_USD) {
 // Larger sizes nudge price slightly
 if (design.sizeId === "50x70" || design.sizeId === "18x24") return base + 4;
 if (design.sizeId === "a3" || design.sizeId === "30x40") return base + 2;
 return base;
}
