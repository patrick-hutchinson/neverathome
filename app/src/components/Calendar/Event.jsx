import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { motion } from "framer-motion";

import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";

import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";
import { StateContext } from "@/context/StateContext";

import Media from "../Media";
import Text from "../Text";

import EventTitle from "./EventTitle";
import EventLink from "./EventLink";
import EventDate from "./EventDate";
import EventType from "./EventType";
import EventDescription from "./EventDescription";
import GalleryCounter from "./GalleryCounter";

import styles from "./Calendar.module.css";
import EventExpand from "./EventExpand";

const Event = ({ event, size, setEventInView, isExpanded, onClick, imageInView }) => {
  const ref = useRef(null);

  switch (size) {
    case "small":
      return <SmallEvent event={event} ref={ref} />;
    case "medium":
      return <MediumEvent event={event} ref={ref} isExpanded={isExpanded} onClick={onClick} />;
    case "large":
      return <LargeEvent event={event} ref={ref} isExpanded={isExpanded} onClick={onClick} imageInView={imageInView} />;
  }
};

const SmallEvent = ({ event, ref }) => {
  return (
    <motion.li
      id={event.slug.current}
      ref={ref}
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

const MediumEvent = ({ event, isExpanded, onClick, ref }) => {
  const [isExpandable, setIsExpandable] = useState(event.info);

  return (
    <motion.li
      id={event.slug.current}
      ref={ref}
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
      <EventDescription event={event} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <EventLink event={event} />

      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </motion.li>
  );
};

const LargeEvent = ({ event, isExpanded, onClick, imageInView, ref }) => {
  const { isMobile } = useContext(StateContext);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const isExpandable = event.gallery || event.info;

  // Scroll to Expanded Element
  useEffect(() => {
    if (isExpanded && ref.current) {
      setTimeout(() => {
        const top = ref.current.getBoundingClientRect().top + window.scrollY;
        const offset = header_height + filter_height; // distance from top in px

        window.scrollTo({
          top: top - offset,
          behavior: "smooth",
        });
      }, 800);
    }
  }, [isExpanded]);

  return (
    <motion.li
      id={event.slug.current}
      ref={ref}
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
      <GalleryCounter event={event} imageInView={imageInView} isExpanded={isExpanded} />

      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </motion.li>
  );
};

export default Event;
