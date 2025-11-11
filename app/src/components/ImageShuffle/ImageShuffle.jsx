"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Media from "../Media";
import styles from "./ImageShuffle.module.css";

const ImageShuffle = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Preload all images before starting ---
  useEffect(() => {
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setIsLoaded(true);
      }
    };

    images.forEach((image) => {
      const img = new Image();
      // If you're using Sanity or dynamic URLs, adapt this:
      img.src = typeof image === "string" ? image : image.url;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });
  }, [images]);

  // --- Start the shuffle once images are preloaded ---
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= images.length) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 300);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [images, isLoaded]);

  // --- Render loading screen until preloaded ---
  if (!isLoaded) {
    return (
      <div
        className={styles.container}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "black",
          color: "white",
        }}
      >
        {/* LOADING */}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 20 }}
        >
          <Media medium={images[index]} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageShuffle;
