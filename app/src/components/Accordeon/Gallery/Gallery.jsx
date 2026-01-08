"use client";
import { useRef, useEffect, useState } from "react";

import Media from "@/components/Media";
import styles from "../Accordeon.module.css";

const Gallery = ({ event, setImageInView, className, containerRef }) => {
  if (!event.gallery) return undefined;

  return (
    <ul className={`${className} ${styles.gallery}`}>
      {event.gallery.map((medium, index) => (
        <GalleryItem
          key={index}
          medium={medium}
          index={index}
          setImageInView={setImageInView}
          containerRef={containerRef}
        />
      ))}
    </ul>
  );
};

const GalleryItem = ({ medium, index, setImageInView, containerRef, isExpanded }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageInView(index);
        }
      },
      {
        root: containerRef.current, // 👈 THIS is the scroll container
        threshold: 0.5,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [index, setImageInView, containerRef, isExpanded]);

  return (
    <li ref={ref}>
      <Media medium={medium} />
    </li>
  );
};

export default Gallery;
