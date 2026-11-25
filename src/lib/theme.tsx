"use client";

import {
 createContext,
 useCallback,
 useContext,
 useEffect,
 useMemo,
 useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
 theme: Theme;
 ready: boolean;
 setTheme: (t: Theme) => void;
 toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const KEY = "tenshigeo-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setThemeState] = useState<Theme>("light");
 const [ready, setReady] = useState(false);

 useEffect(() => {
  const stored = localStorage.getItem(KEY) as Theme | null;
  const prefersDark =
   window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const next = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
  setThemeState(next);
  document.documentElement.dataset.theme = next;
  setReady(true);
 }, []);

 const setTheme = useCallback((t: Theme) => {
  setThemeState(t);
  document.documentElement.dataset.theme = t;
  localStorage.setItem(KEY, t);
 }, []);

 const toggle = useCallback(() => {
  setTheme(theme === "light" ? "dark" : "light");
 }, [setTheme, theme]);

 const value = useMemo(
  () => ({ theme, ready, setTheme, toggle }),
  [theme, ready, setTheme, toggle],
 );

 return (
  <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
 );
}

export function useTheme() {
 const ctx = useContext(ThemeContext);
 if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
 return ctx;
}
