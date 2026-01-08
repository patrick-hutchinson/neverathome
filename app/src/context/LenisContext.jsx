"use client";

import { ReactLenis, useLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  useLenis((lenis) => {
    // runs on every scroll
    // console.log(lenis.scroll);
  });

  return (
    <ReactLenis root options={{ allowNestedScroll: true }}>
      {children}
    </ReactLenis>
  );
}
