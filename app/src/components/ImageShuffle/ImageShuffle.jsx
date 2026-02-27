"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Media from "../Media/Media";
import styles from "./ImageShuffle.module.css";

let hasPlayedHomeIntro = false;

const ImageShuffle = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(hasPlayedHomeIntro ? "hidden" : "loading");

  // Preload all intro images before starting the animation.
  useEffect(() => {
    if (hasPlayedHomeIntro) {
      setPhase("hidden");
      return;
    }

    const safeImages = Array.isArray(images) ? images : [];
    const urls = safeImages
      .map((image) => (typeof image === "string" ? image : image?.url))
      .filter(Boolean);

    if (urls.length === 0) {
      hasPlayedHomeIntro = true;
      setPhase("hidden");
      return;
    }

    let isCancelled = false;

    const preload = (url) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });

    Promise.all(urls.map(preload)).then(() => {
      if (isCancelled) return;
      setPhase("playing");
    });

    return () => {
      isCancelled = true;
    };
  }, [images]);

  // Run intro only once per app load (resets on full browser refresh).
  useEffect(() => {
    if (phase !== "playing") return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const total = Array.isArray(images) ? images.length : 0;
        if (prevIndex + 1 >= total) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("fading");
          }, 300);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [images, phase]);

  if (phase === "hidden") return null;

  if (phase === "loading") {
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
        &nbsp;
      </div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        if (phase === "fading") {
          hasPlayedHomeIntro = true;
          setPhase("hidden");
        }
      }}
      style={{ zIndex: 20 }}
    >
      <Media medium={images[index]} />
    </motion.div>
  );
};

export default ImageShuffle;
