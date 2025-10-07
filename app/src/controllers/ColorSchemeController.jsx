"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ColorSchemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const invertedPages = ["/contact", "/studios", "/workshops", "/artists", "/locations", "/about"];
    if (invertedPages.includes(pathname)) {
      document.body.classList.add("invert");
    } else {
      document.body.classList.remove("invert");
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("/calendar")) {
      document.querySelector("header").classList.add("no-filter");
    } else {
      document.querySelector("header").classList.remove("no-filter");
    }
  }, [pathname]);

  return null;
}
