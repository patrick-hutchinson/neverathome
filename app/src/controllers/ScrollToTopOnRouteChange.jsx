"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenisContext } from "@/context/LenisContext";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenisContext();

  useEffect(() => {
    // Disable browser restoration (back/forward)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // On every navigation, force top.
    // If Lenis is controlling scroll, use it.
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // or { duration: 0, immediate: true }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, lenis]);

  return null;
}
