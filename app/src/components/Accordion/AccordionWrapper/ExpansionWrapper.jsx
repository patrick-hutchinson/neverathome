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

    const anchorId = item?.slug?.current || item?._id || undefined;

    return (
      <motion.div
        layout="position"
        ref={ref}
        id={anchorId}
        className={`${isExpanded ? styles.expanded : ""} ${invert && styles.invert}`}
        style={{
          cursor: isExpandable ? "pointer" : "default",
          background: isExpanded ? colorPair.background.value : background,
          color: isExpanded ? colorPair.text.value : text,
          fill: isExpanded ? colorPair.text.value : text,
        }}
        whileHover={isExpandable && hoverColors(colorPair)}
        onClick={(event) => {
          if (!isExpandable || !item?._id) return;
          const target = event.target;
          if (target instanceof Element && target.closest("a, button, input, textarea, select, label")) return;
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
