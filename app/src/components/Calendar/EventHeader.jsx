import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import FormatDate from "../FormatDate";
import Media from "../Media";
import Text from "../Text";

import EventTitle from "./EventTitle";
import EventLink from "./EventLink";
import EventDate from "./EventDate";
import EventType from "./EventType";

import styles from "./Calendar.module.css";
import { useEffect, useRef, useState } from "react";

export const MicroEvent = ({ event }) => {
  return (
    <motion.li
      className={`${styles.event}`}
      whileHover={() => {
        return {
          background: event.colorPair?.background.value,
          color: event.colorPair?.text.value,
          transition: { duration: 0.5 },
        };
      }}
    >
      <EventType event={event} />
      <EventDate event={event} />
      <EventTitle event={event} />
    </motion.li>
  );
};

export const UpcomingEvent = ({ event, isExpanded, onClick }) => {
  const eventRef = useRef(null);
  const textRef = useRef(null);

  const [textHeight, setTextHeight] = useState(null);
  const [isExpandable, setIsExpandable] = useState(false);

  const Description = ({ event }) =>
    event.info && (
      <div
        ref={textRef}
        className={styles.text}
        style={{ maxHeight: isExpanded ? textHeight : "calc(var(--line-height-3) * 3)" }}
      >
        <Text text={event.info} />
      </div>
    );

  useEffect(() => {
    if (!textRef.current) return undefined;
    setTextHeight(textRef.current.scrollHeight);
    console.log(textRef.current.scrollHeight, "text height");
  }, [event]);

  useEffect(() => {
    if (textHeight > 170) {
      setIsExpandable(true);
    }
  }, [textHeight]);

  return (
    <motion.li
      ref={eventRef}
      onClick={onClick}
      className={`${styles.event} ${styles.upcoming} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: event.colorPair?.background.value,
          color: event.colorPair?.text.value,
          transition: { duration: 0.5 },
        };
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <EventType event={event} />
      <EventDate event={event} />
      <Media objectFit="contain" className={styles.media} medium={event.thumbnail} />
      <EventTitle event={event} />
      <Description event={event} />
      <EventLink event={event} />

      {isExpandable && <div className={styles.expand}>{isExpanded ? "-" : "+"}</div>}
    </motion.li>
  );
};

export const PastEvent = ({ event, isExpanded, onClick, currentlyInView }) => {
  const isExpandable = event.gallery || event.info;
  const eventRef = useRef(null);

  console.log(isExpanded, "isExpanded");

  useEffect(() => {
    if (isExpanded && eventRef.current) {
      const top = eventRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = 85; // distance from top in px

      window.scrollTo({
        top: top - offset,
        behavior: "smooth",
      });
    }
  }, [isExpanded]);

  const GalleryCounter = ({ event }) => {
    if (!event.gallery) return;
    return (
      <div className={styles.counter}>
        {currentlyInView + 1}/{event.gallery?.length}
      </div>
    );
  };

  return (
    <motion.li
      ref={eventRef}
      onClick={onClick}
      className={`${styles.event} ${event.past} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: event.colorPair?.background.value,
          color: event.colorPair?.text.value,
          transition: { duration: 0.5 },
        };
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        cursor: isExpandable ? "pointer" : "default",
        position: isExpanded && "sticky",
        top: 0,
        zIndex: 2,
        background: isExpanded ? event.colorPair?.background.value : "#000",
        color: isExpanded ? event.colorPair?.text.value : "#fff",
      }}
    >
      <EventType event={event} />
      <EventDate event={event} />
      <EventTitle event={event} />
      <GalleryCounter event={event} />

      {isExpandable && <div className={styles.expand}>{isExpanded ? "-" : "+"}</div>}
    </motion.li>
  );
};
