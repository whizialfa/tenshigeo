"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/analysis", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/request", label: "Request" },
  { href: "/studio", label: "Print studio" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--fog)_92%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          aria-label="TenshiGeo"
          className="font-display shrink-0 text-lg font-bold tracking-tight text-ink sm:text-xl"
        >
          Tenshi<span className="text-sea">Geo</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink lg:flex xl:gap-7">
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href="/request"
            className="tg-link-on-dark hidden items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:opacity-90 sm:inline-flex sm:px-5 sm:py-2.5"
          >
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
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-card text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--fog)] px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const active =
                l.href.startsWith("/#")
                  ? false
                  : pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                      active ? "bg-sea/10 text-sea" : "text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/request"
                className="tg-link-on-dark flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3.5 text-sm font-bold text-white"
                onClick={() => setOpen(false)}
              >
                Hire me
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
