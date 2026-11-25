"use client";

import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/theme";
import { CookieConsent } from "./CookieConsent";

export function Providers({ children }: { children: React.ReactNode }) {
 return (
  <ThemeProvider>
   <CartProvider>
    {children}
    <CookieConsent />
   </CartProvider>
  </ThemeProvider>
 );
}
