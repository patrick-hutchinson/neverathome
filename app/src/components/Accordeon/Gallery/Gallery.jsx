"use client";
import { useRef, useEffect } from "react";

import Media from "@/components/Media";
import styles from "../Accordeon.module.css";

const Gallery = ({ event, setImageInView, className, isExpanded }) => {
  if (!event.gallery) return <div />;

  return (
    <ul className={`${className} ${styles.gallery}`}>
      {event.gallery.map((medium, index) => (
        <GalleryItem key={index} medium={medium} index={index} setImageInView={setImageInView} isExpanded={isExpanded} />
      ))}
    </ul>
  );
};

const GalleryItem = ({ medium, index, setImageInView, isExpanded }) => {
  const ref = useRef(null);

  // Gallery intersection observer
  useEffect(() => {
    if (!isExpanded) return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageInView(index);
        }
      },
      {
        threshold: 0.75,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [index, setImageInView, isExpanded]);

  return (
    <li ref={ref}>
      <Media medium={medium} />
    </li>
  );
};

export default Gallery;
