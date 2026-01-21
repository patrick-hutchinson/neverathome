import { forwardRef, useContext, useEffect, useState } from "react";

import { getColors } from "@/helpers/getColors";
import { hoverColors } from "@/helpers/hoverColors";

import { useScrollToExpanded } from "../hooks/useScrollToExpand";
import { useLenisContext } from "@/context/LenisContext";

import { motion } from "framer-motion";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

import styles from "../Accordeon.module.css";

const ExpansionWrapper = forwardRef(
  ({ index, children, isExpanded, item, handleExpand, colorPair, invert, setExpandedElement }, ref) => {
    const { header_height, filter_height } = useContext(GlobalVariablesContext);
    const { background, text } = getColors(invert);

    useScrollToExpanded({ isExpanded, ref, offset: header_height + filter_height });

    const lenis = useLenisContext();

    const closeAccordion = () => {
      if (!ref.current || !lenis) return;

      const top = ref.current.getBoundingClientRect().top + window.scrollY - header_height - filter_height;

      lenis.scrollTo(top, {
        duration: 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          setExpandedElement(null);
        },
      });
    };

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
        onClick={() => {
          if (isExpanded) {
            closeAccordion();
          } else {
            handleExpand(item._id);
          }
        }}
        data-index={index}
      >
        {children}
      </motion.div>
    );
  },
);

export default ExpansionWrapper;
