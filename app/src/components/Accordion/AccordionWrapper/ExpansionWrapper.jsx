import { forwardRef, useContext, useEffect, useState } from "react";

import { getColors } from "@/helpers/getColors";
import { hoverColors } from "@/helpers/hoverColors";

// import { useScrollToExpanded } from "../hooks/useScrollToExpand";
// import { useLenisContext } from "@/context/LenisContext";

import { motion } from "framer-motion";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

import styles from "../Accordion.module.css";
import { usePathname } from "next/navigation";

const ExpansionWrapper = forwardRef(
  ({ index, children, isExpanded, item, handleExpand, colorPair, invert, isExpandable }, ref) => {
    const pathname = usePathname();

    const { header_height, filter_height } = useContext(GlobalVariablesContext);
    const { background, text } = getColors(invert);

    const isAbout = pathname === "/about";
    const distance = isAbout ? header_height : header_height + filter_height;

    // useScrollToExpanded({ isExpanded, ref, offset: distance });

    return (
      <motion.div
        ref={ref}
        id={item.slug.current}
        className={`${isExpanded ? styles.expanded : ""} ${invert && styles.invert}`}
        style={{
          cursor: isExpandable ? "pointer" : "default",
          background: isExpanded ? colorPair.background.value : background,
          color: isExpanded ? colorPair.text.value : text,
          fill: isExpanded ? colorPair.text.value : text,
        }}
        whileHover={isExpandable && hoverColors(colorPair)}
        onClick={() => {
          if (!isExpandable) return;
          handleExpand(item._id);
        }}
        data-index={index}
      >
        {children}
      </motion.div>
    );
  },
);

export default ExpansionWrapper;
