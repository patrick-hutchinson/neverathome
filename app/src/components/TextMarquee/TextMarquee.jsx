"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./TextMarquee.module.css";

const TextMarquee = ({ text, typo, className }) => {
  const [width, setWidth] = useState(0);
  const marquee = useRef(null);

  // Measure and re-measure width on resize
  useEffect(() => {
    const el = marquee.current;
    if (!el) return;

    const updateWidth = () => setWidth(el.scrollWidth);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [text]);

  return (
    <div className={`${className} ${styles.marquee_outer}`} typo={typo}>
      <motion.div
        ref={marquee}
        className={styles.marquee_inner}
        animate={{ x: [-width / 2, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 8,
          },
        }}
      >
        {Array(4)
          .fill(text)
          .map((_, index) => (
            <div key={index}>{text}</div>
          ))}
      </motion.div>
    </div>
  );
};

export default TextMarquee;
