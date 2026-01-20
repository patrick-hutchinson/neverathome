import { useContext, useMemo } from "react";
import { StateContext } from "@/context/StateContext";

export const useColorPair = (item) => {
  const { colorPairs } = useContext(StateContext);

  return useMemo(() => {
    if (item?.colorPair) return item.colorPair;

    if (!colorPairs?.length) {
      return {
        background: { value: "#000" },
        text: { value: "#fff" },
      };
    }

    return colorPairs[Math.floor(Math.random() * colorPairs.length)];
  }, [item?.colorPair, colorPairs]);
};
