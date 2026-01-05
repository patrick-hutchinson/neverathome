"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Media from "../Media";
import styles from "./Slideshow.module.css";
import FadePresence from "../FadePresence";

import { StateContext } from "@/context/StateContext";

const Slideshow = ({ media }) => {
  const { isTouch } = useContext(StateContext);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + media.length) % media.length);
  };

  // auto advance
  useEffect(() => {
    const isVideo = media[current]?.medium?.type === "video";

    // Don't auto advance when it's a video
    if (isVideo || paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(next, 4000);

    return () => clearInterval(intervalRef.current);
  }, [current, paused, media.length]);

  const handleClick = () => {
    if (isTouch) return;
    next();
  };

  const minSwipeDistance = 50; // px

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < minSwipeDistance) return; // ignore tiny swipes

    if (distance > 0) {
      // swipe left → next
      next();
    } else {
      // swipe right → prev
      prev();
    }
  };

  return (
    <FadePresence
      className={styles.container}
      motionKey={media[current].url}
      onClick={handleClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Media medium={media[current]} />
    </FadePresence>
  );
};

export default Slideshow;
