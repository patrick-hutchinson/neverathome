"use client";
import { useEffect } from "react";

export default function RandomSelectionColor({ colorPairs }) {
  const textColors = colorPairs.map((pair) => pair.text.value);

  useEffect(() => {
    const handleSelection = () => {
      console.log("selecting text!");
      const randomColor = textColors[Math.floor(Math.random() * textColors.length)];

      // You could even pair text color dynamically if you want
      document.documentElement.style.setProperty("--selection-color", randomColor);
    };

    document.addEventListener("selectstart", handleSelection);
    return () => document.removeEventListener("selectstart", handleSelection);
  }, [textColors]);

  return null; // no UI output
}
