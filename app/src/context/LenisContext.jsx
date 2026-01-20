"use client";

import { ReactLenis, useLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis root options={{ allowNestedScroll: true }}>
      {children}
    </ReactLenis>
  );
}
