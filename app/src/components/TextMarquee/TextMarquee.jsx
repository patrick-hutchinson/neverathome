"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./TextMarquee.module.css";

const TextMarquee = ({ text, typo, className }) => {
  const [width, setWidth] = useState(null);
  const marquee = useRef(null);

  useEffect(() => {
    setWidth(marquee.current.scrollWidth);
  }, [text]);

  console.log(width, "width");

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
