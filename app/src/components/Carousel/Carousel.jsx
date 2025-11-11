"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.css";

const Carousel = ({ children, speed }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, dragResistance: 1 }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false, // <-- here
      stopOnMouseEnter: false, // <— optional: keep scrolling even on hover
      speed: speed ?? 1.5,
    }),
  ]);

  return (
    <div className={`${styles.carousel_outer} embla`} ref={emblaRef}>
      <div className={`${styles.carousel_inner} embla__container`}>{children}</div>
    </div>
  );
};

export default Carousel;
