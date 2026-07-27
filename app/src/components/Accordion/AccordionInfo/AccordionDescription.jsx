import { useRef, useLayoutEffect, useState } from "react";

import Text from "@/components/Text";

import styles from "../Accordion.module.css";

const AccordionDescription = ({ event, isExpanded }) => {
  const [teaserHeight, setTeaserHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [isMeasured, setIsMeasured] = useState(false);
  const teaserRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const measure = () => {
      const nextTeaserHeight = teaserRef.current?.scrollHeight || 0;
      const nextTextHeight = textRef.current?.scrollHeight || 0;

      setTeaserHeight((prev) => (prev === nextTeaserHeight ? prev : nextTeaserHeight));
      setTextHeight((prev) => (prev === nextTextHeight ? prev : nextTextHeight));
      setIsMeasured(true);
    };

    // Measure before paint, then once more after layout settles.
    measure();
    const rafId = requestAnimationFrame(measure);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [event]);

  return (
    <div
      className={styles.text}
      style={{
        maxHeight: isExpanded ? textHeight + teaserHeight : teaserHeight,
        opacity: isMeasured ? 1 : 0,
        transition: "max-height 0.5s ease-in-out",
        paddingBottom: "2px",
      }}
    >
      <div ref={teaserRef}>
        <Text text={event.teaser} />
      </div>

      {event.info && (
        <div ref={textRef} style={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
          <Text text={event.info} typo="h3" />
        </div>
      )}
    </div>
  );
};

export default AccordionDescription;
