import { useContext, useMemo } from "react";
import { StateContext } from "@/context/StateContext";

const FALLBACK = {
  background: { value: "#000" },
  text: { value: "#fff" },
};

export const useColorPair = (item) => {
  const { colorPairs } = useContext(StateContext);

  return useMemo(() => {
    // 1. Explicit color on item always wins
    if (item?.colorPair?.background?.value && item?.colorPair?.text?.value) {
      return item.colorPair;
    }

    if (!Array.isArray(colorPairs) || colorPairs.length === 0) {
      return FALLBACK;
    }

    // 2. Filter out the fallback pair
    const validPairs = colorPairs.filter((pair) => pair?.background?.value !== "#000" || pair?.text?.value !== "#fff");

    // 3. If everything was filtered out, use fallback
    if (validPairs.length === 0) {
      return FALLBACK;
    }

    // 4. Pick a random valid pair
    return validPairs[Math.floor(Math.random() * validPairs.length)];
  }, [item?.colorPair, colorPairs]);
};
