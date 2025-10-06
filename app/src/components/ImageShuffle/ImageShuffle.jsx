import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Media from "../Media";
import styles from "./ImageShuffle.module.css";

const ImageShuffle = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= images.length) {
          // Last image reached, stop interval
          clearInterval(interval);

          // Wait 1 second, then fade out
          setTimeout(() => setIsVisible(false), 300);
          return prevIndex; // stay on last image
        }
        return prevIndex + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // fade-out duration
        >
          <Media medium={images[index]} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageShuffle;
