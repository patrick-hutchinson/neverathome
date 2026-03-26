"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Media from "../Media/Media";
import styles from "./ImageShuffle.module.css";

let hasPlayedHomeIntro = false;
const MAX_INTRO_IMAGES = 14;
const MAX_PRELOAD_WAIT_MS = 1500;

const ImageShuffle = ({ images }) => {
  const introImages = useMemo(() => (Array.isArray(images) ? images.slice(0, MAX_INTRO_IMAGES) : []), [images]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(hasPlayedHomeIntro ? "hidden" : "loading");

  // Preload all intro images before starting the animation.
  useEffect(() => {
    if (hasPlayedHomeIntro) {
      setPhase("hidden");
      return;
    }

    const urls = introImages.map((image) => (typeof image === "string" ? image : image?.url)).filter(Boolean);

    if (urls.length === 0) {
      hasPlayedHomeIntro = true;
      setPhase("hidden");
      return;
    }

    let isCancelled = false;
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      if (isCancelled) return;
      didTimeout = true;
      hasPlayedHomeIntro = true;
      setPhase("hidden");
    }, MAX_PRELOAD_WAIT_MS);

    const preload = (url) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });

    Promise.all(urls.map(preload)).then(() => {
      if (isCancelled) return;
      if (didTimeout || hasPlayedHomeIntro) return;
      window.clearTimeout(timeoutId);
      setPhase("playing");
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [introImages]);

  // Run intro only once per app load (resets on full browser refresh).
  useEffect(() => {
    if (phase !== "playing") return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const total = introImages.length;
        const boundedTotal = Math.max(total, 0);
        if (prevIndex + 1 >= boundedTotal) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("fading");
          }, 300);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 125);

    return () => clearInterval(interval);
  }, [introImages, phase]);

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
      <Media medium={introImages[index]} />
    </motion.div>
  );
};

export default ImageShuffle;
