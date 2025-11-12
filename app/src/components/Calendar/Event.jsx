import { useEffect, useRef, useState } from "react";
import { useContext, useMemo } from "react";
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
  const { colorPairs } = useContext(StateContext);

  const randomColorPair = useMemo(() => {
    if (!colorPairs?.length) return null;
    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    return colorPairs[randomIndex];
  }, [colorPairs]);

  const colorPair = event.colorPair || randomColorPair;

  const ref = useRef(null);

  console.log(colorPairs, "color pairs (all)");

  console.log(isExpanded);

  switch (size) {
    case "small":
      return <SmallEvent event={event} ref={ref} colorPair={colorPair} />;
    case "medium":
      return <MediumEvent event={event} ref={ref} isExpanded={isExpanded} onClick={onClick} colorPair={colorPair} />;
    case "large":
      return (
        <LargeEvent
          event={event}
          ref={ref}
          isExpanded={isExpanded}
          onClick={onClick}
          imageInView={imageInView}
          colorPair={colorPair}
        />
      );
  }
};

const SmallEvent = ({ event, ref, colorPair }) => {
  return (
    <motion.li
      id={event.slug.current}
      ref={ref}
      className={`${styles.event}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
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

const MediumEvent = ({ event, isExpanded, onClick, ref, colorPair }) => {
  const [isExpandable, setIsExpandable] = useState(event.info);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

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
      className={`${styles.event} ${styles.upcoming} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
          transition: { duration: 0.5 },
        };
      }}
      style={{
        fill: isExpanded ? colorPair?.text.value : "#fff",
        background: isExpanded ? colorPair?.background.value : "#000",
        color: isExpanded ? colorPair?.text.value : "#fff",
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

const LargeEvent = ({ event, isExpanded, onClick, imageInView, ref, colorPair }) => {
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
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
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
        background: isExpanded ? colorPair?.background?.value ?? "#000" : "#000",
        color: isExpanded ? colorPair?.text?.value ?? "#fff" : "#fff",
        fill: isExpanded ? colorPair?.text?.value ?? "#fff" : "#fff",
      }}
    >
      <EventType event={event} />
      <EventDate event={event} />
      <EventTitle event={event} />
      <GalleryCounter event={event} imageInView={imageInView} isExpanded={isExpanded} />

      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} event={event} />
    </motion.li>
  );
};

export default Event;
