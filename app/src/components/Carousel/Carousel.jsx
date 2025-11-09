"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.css";

const Carousel = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true, dragResistance: 0.1 }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false, // <-- here
      speed: 1,
    }),
  ]);

  const autoScroll = emblaApi?.plugins()?.autoScroll;

  const handleStop = () => {
    if (!autoScroll) return;
    autoScroll.stop();
  };

  const handleStart = () => {
    if (!autoScroll) return;
    autoScroll.stop();
  };

  return (
    <div
      className={`${styles.carousel_outer} embla`}
      ref={emblaRef}
      onMouseEnter={() => handleStop()}
      onMouseLeave={() => handleStart()}
    >
      <div className={`${styles.carousel_inner} embla__container`}>{children}</div>
    </div>
  );
};

export default Carousel;
