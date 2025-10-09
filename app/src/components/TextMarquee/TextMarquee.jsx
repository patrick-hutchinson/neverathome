import { useState, useEffect, useRef } from "react";
import styles from "./TextMarquee.module.css";
import { motion } from "framer-motion";

const TextMarquee = ({ text, fontSize, className }) => {
  const [width, setWidth] = useState(null);
  const marquee = useRef(null);

  useEffect(() => {
    setWidth(marquee.current.scrollWidth);
  }, []);

  return (
    <div className={`${className} ${styles.marquee_outer}`}>
      <motion.div
        ref={marquee}
        className={styles.marquee_inner}
        animate={{ x: ["0%", -width / 2] }}
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
            <div key={index} className={fontSize}>
              {text}
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default TextMarquee;
