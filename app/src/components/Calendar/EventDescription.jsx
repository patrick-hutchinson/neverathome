import { useRef, useEffect, useState } from "react";

import Text from "@/components/Text";

import styles from "./Calendar.module.css";

const EventDescription = ({ event, isExpanded }) => {
  const [teaserHeight, setTeaserHeight] = useState(null);
  const [textHeight, setTextHeight] = useState(null);
  const teaserRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return undefined;
    setTextHeight(textRef.current.scrollHeight);
  }, [event]);

  useEffect(() => {
    if (!teaserRef.current) return undefined;
    setTeaserHeight(teaserRef.current.scrollHeight);
  }, [event]);

  return (
    <div
      className={styles.text}
      style={{
        maxHeight: isExpanded ? textHeight + teaserHeight : teaserHeight,
        transition: "max-height 0.5s ease-in-out",
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

export default EventDescription;
