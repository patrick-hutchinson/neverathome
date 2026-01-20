import { forwardRef, useContext, useEffect, useState } from "react";

import { getColors } from "@/helpers/getColors";
import { hoverColors } from "@/helpers/hoverColors";

import { useScrollToExpanded } from "../hooks/useScrollToExpand";

import { motion } from "framer-motion";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

import styles from "../Accordeon.module.css";

const ExpansionWrapper = forwardRef(({ index, children, isExpanded, item, handleExpand, colorPair, invert }, ref) => {
  const { header_height, filter_height } = useContext(GlobalVariablesContext);
  const { background, text } = getColors(invert);

  useScrollToExpanded({ isExpanded, ref, offset: header_height + filter_height });

  return (
    <motion.div
      ref={ref}
      id={item.slug.current}
      className={`${isExpanded ? styles.expanded : ""} ${invert && styles.invert}`}
      style={{
        cursor: "pointer",
        background: isExpanded ? colorPair.background.value : background,
        color: isExpanded ? colorPair.text.value : text,
        fill: isExpanded ? colorPair.text.value : text,
      }}
      whileHover={hoverColors(colorPair)}
      onClick={() => handleExpand(item._id)}
      data-index={index}
    >
      {children}
    </motion.div>
  );
});

export default ExpansionWrapper;
