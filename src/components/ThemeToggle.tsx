"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
 const { theme, ready, toggle } = useTheme();
 if (!ready) {
  return (
   <span
    className="inline-flex h-10 w-10 rounded-full border border-[var(--line)] bg-card"
    aria-hidden
   />
  );
 }

 return (
  <button
   type="button"
   onClick={toggle}
   className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-card text-ink shadow-sm transition hover:border-sea"
   aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
   title={theme === "light" ? "Dark appearance" : "Light appearance"}
  >
   {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
  </button>
 );
}
