"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Media from "@/components/Media";
import styles from "./Calendar.module.css";

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

const GalleryItem = ({ medium, index, setImageInView, containerRef }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!containerRef?.current || !ref?.current) return;

    const el = ref.current;
    const container = containerRef.current;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Trigger when top of image crosses top of container
      if (rect.top <= containerRect.top && rect.bottom > containerRect.top) {
        setImageInView(index);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // run once initially

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, index, setImageInView]);

  return (
    <li ref={ref}>
      <Media medium={medium} />
    </li>
  );
};

export default Gallery;
