"use client";
import { useEffect, useMemo } from "react";

export default function RandomSelectionColor({ colorPairs }) {
  const textColors = useMemo(
    () =>
      colorPairs
        .map((pair) => pair.text.value)
        .filter((color) => color && color.toLowerCase() !== "#000000" && color.toLowerCase() !== "black"),
    [colorPairs],
  );

  useEffect(() => {
    if (!textColors.length) return;

    const handleSelection = () => {
      const randomColor = textColors[Math.floor(Math.random() * textColors.length)];
      document.documentElement.style.setProperty("--selection-color", randomColor);
    };

    document.addEventListener("selectstart", handleSelection);
    return () => document.removeEventListener("selectstart", handleSelection);
  }, [textColors]);

  return null;
}
