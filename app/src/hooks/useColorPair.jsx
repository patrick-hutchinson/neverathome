import { useContext, useMemo } from "react";
import { StateContext } from "@/context/StateContext";

const FALLBACK = {
  background: { value: "#000" },
  text: { value: "#fff" },
};

const getStableIndex = (key, length) => {
  if (!key || length <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
};

export const getColorPairForItem = (item, colorPairs) => {
  if (item?.colorPair?.background?.value && item?.colorPair?.text?.value) {
    return item.colorPair;
  }

  if (!Array.isArray(colorPairs) || colorPairs.length === 0) {
    return FALLBACK;
  }

  const validPairs = colorPairs.filter((pair) => pair?.background?.value !== "#000" || pair?.text?.value !== "#fff");
  if (validPairs.length === 0) {
    return FALLBACK;
  }

  const stableKey = item?._id || item?.slug?.current || item?.title || "";
  return validPairs[getStableIndex(stableKey, validPairs.length)];
};

export const useColorPair = (item) => {
  const { colorPairs } = useContext(StateContext);

  return useMemo(() => getColorPairForItem(item, colorPairs), [item, colorPairs]);
};
