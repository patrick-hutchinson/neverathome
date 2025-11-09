"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Media from "@/components/Media";
import styles from "./Calendar.module.css";

const Gallery = ({ event, setCurrentlyInView, className }) => {
  if (!event.gallery) return null;

  return (
    <ul className={`${className} ${styles.gallery}`}>
      {event.gallery.map((medium, index) => (
        <GalleryItem key={index} medium={medium} index={index} setCurrentlyInView={setCurrentlyInView} />
      ))}
    </ul>
  );
};

const GalleryItem = ({ medium, index, setCurrentlyInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -90% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setCurrentlyInView(index);
      console.log("Active media index:", index);
    }
  }, [isInView, index, setCurrentlyInView]);

  return (
    <li ref={ref}>
      <Media medium={medium} />
    </li>
  );
};

export default Gallery;
