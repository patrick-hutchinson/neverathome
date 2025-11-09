import { useRef, useEffect, useState } from "react";

import Text from "@/components/Text";

import styles from "./Calendar.module.css";

const EventDescription = ({ event, setIsExpandable, isExpanded }) => {
  const [textHeight, setTextHeight] = useState(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return undefined;
    setTextHeight(textRef.current.scrollHeight);
  }, [event]);

  useEffect(() => {
    if (textHeight > 170) {
      setIsExpandable(true);
    }
  }, [textHeight]);

  return (
    event.info && (
      <div
        ref={textRef}
        className={styles.text}
        style={{ maxHeight: isExpanded ? textHeight : "calc(var(--line-height-3) * 3)" }}
      >
        <Text text={event.info} />
      </div>
    )
  );
};

export default EventDescription;
