"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { StateContext } from "./StateContext";

export const GlobalVariablesContext = createContext();

export const GlobalVariablesProvider = ({ children }) => {
  const { isMobile, isTablet, isDesktop } = useContext(StateContext);
  const [values, setValues] = useState({
    line_height_4: 0,
    caption_gap: 0,
    filter_height: 0,
    header_height: 0,
  });

  useEffect(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);

    const parse = (v) => parseFloat(v);

    setValues({
      line_height_4: parse(style.getPropertyValue("--line-height-4")),
      caption_gap: parse(style.getPropertyValue("--caption-gap")),
      filter_height: parse(style.getPropertyValue("--filter-height")),
      header_height: parse(style.getPropertyValue("--header-height")),
    });
  }, [isMobile, isTablet, isDesktop]);

  return <GlobalVariablesContext.Provider value={values}>{children}</GlobalVariablesContext.Provider>;
};
