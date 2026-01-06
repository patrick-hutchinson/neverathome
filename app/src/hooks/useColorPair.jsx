import { useContext, useMemo } from "react";
import { StateContext } from "@/context/StateContext";

export const useColorPair = (item) => {
  const { colorPairs } = useContext(StateContext);

  return useMemo(() => {
    if (item?.colorPair) return item.colorPair;
    if (!colorPairs?.length) return null;

    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    return colorPairs[randomIndex];
  }, [item?.colorPair, colorPairs]);
};
