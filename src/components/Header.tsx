"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
 { href: "/work", label: "Work" },
 { href: "/analysis", label: "Services" },
 { href: "/#process", label: "Process" },
 { href: "/request", label: "Request" },
];

export function Header() {
 const pathname = usePathname();
 const { count, ready } = useCart();

 return (
  <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--fog)_92%,transparent)] backdrop-blur-md">
   <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
    <Link
     href="/"
     aria-label="TenshiGeo"
     className="font-display text-xl font-bold tracking-tight text-ink"
    >
     Tenshi<span className="text-sea">Geo</span>
    </Link>
    <nav className="hidden items-center gap-7 text-sm font-semibold text-ink md:flex">
     {LINKS.map((l) => {
      const active =
       l.href.startsWith("/#")
        ? false
        : pathname === l.href || pathname.startsWith(`${l.href}/`);
      return (
       <Link
        key={l.href}
        href={l.href}
        className={active ? "text-sea" : "text-ink hover:text-sea"}
       >
        {l.label}
       </Link>
      );
     })}
    </nav>
    <div className="flex items-center gap-2">
     <ThemeToggle />
     <Link href="/request" className="inline-flex items-center justify-center tg-link-on-dark rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:opacity-90 hidden sm:inline-flex">
      Hire me
     </Link>
     <Link
      href="/bag"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-card text-ink"
      aria-label="Shopping bag"
     >
      <ShoppingBag size={18} />
      {ready && count > 0 && (
       <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sea px-1 text-[11px] font-bold text-white">
        {count}
       </span>
      )}
     </Link>
    </div>
   </div>
   <div className="flex gap-4 overflow-x-auto border-t border-[var(--line)] px-4 py-2.5 text-xs font-semibold text-ink md:hidden">
    {LINKS.map((l) => (
     <Link key={l.href} href={l.href} className="whitespace-nowrap text-ink">
      {l.label}
     </Link>
    ))}
<Link href="/studio" className="whitespace-nowrap text-ink">
          Print studio
        </Link>
   </div>
  </header>
 );
}
