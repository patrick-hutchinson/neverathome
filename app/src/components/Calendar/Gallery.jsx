"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Media from "@/components/Media";
import styles from "./Calendar.module.css";

const Gallery = ({ event, setImageInView, className }) => {
  if (!event.gallery) return undefined;

  return (
    <ul className={`${className} ${styles.gallery}`}>
      {event.gallery.map((medium, index) => (
        <GalleryItem key={index} medium={medium} index={index} setImageInView={setImageInView} />
      ))}
    </ul>
  );
};

const GalleryItem = ({ medium, index, setImageInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -90% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setImageInView(index);
    }
  }, [isInView, index, setImageInView]);

  return (
    <li ref={ref}>
      <Media medium={medium} />
    </li>
  );
};

export default Gallery;
