import { useEffect, useRef, useState } from "react";
import { useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";
import { StateContext } from "@/context/StateContext";

import Media from "../Media";

import EventTitle from "../Calendar/EventTitle";
import EventLink from "../Calendar/EventLink";
import EventDate from "../Calendar/EventDate";
import EventType from "../Calendar/EventType";
import EventExpand from "../Calendar/EventExpand";
import EventDescription from "../Calendar/EventDescription";
import GalleryCounter from "../Calendar/GalleryCounter";

import styles from "./Accordeon.module.css";

const AccordeonHeader = ({ item, size, isExpanded, onClick, imageInView }) => {
  const { colorPairs } = useContext(StateContext);

  const randomColorPair = useMemo(() => {
    if (!colorPairs?.length) return null;
    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    return colorPairs[randomIndex];
  }, [colorPairs]);

  const colorPair = item.colorPair ?? randomColorPair;

  const ref = useRef(null);

  if (item.type === "location")
    return (
      <LocationHeader
        item={item}
        ref={ref}
        colorPair={colorPair}
        onClick={onClick}
        isExpanded={isExpanded}
        imageInView={imageInView}
      />
    );

  switch (size) {
    case "small":
      return <SmallEvent item={item} ref={ref} colorPair={colorPair} />;
    case "medium":
      return <MediumEvent item={item} ref={ref} isExpanded={isExpanded} onClick={onClick} colorPair={colorPair} />;
    case "large":
      return (
        <LargeEvent
          item={item}
          ref={ref}
          isExpanded={isExpanded}
          onClick={onClick}
          imageInView={imageInView}
          colorPair={colorPair}
        />
      );
  }
};

const LocationHeader = ({ item, isExpanded, onClick, imageInView, ref, colorPair }) => {
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const isExpandable = item.gallery || item.info;

  // Scroll to Expanded Element
  useEffect(() => {
    console.log(isExpanded, "isExpanded", ref.current, "ref");
    if (isExpanded && ref.current) {
      setTimeout(() => {
        const top = ref.current.getBoundingClientRect().top + window.scrollY;
        const offset = header_height; // distance from top in px

        window.scrollTo({
          top: top - offset,
          behavior: "smooth",
        });
      }, 800);
    }
  }, [isExpanded]);

  if (!item) return undefined;

  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${item.past} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
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
      <EventTitle title={item.title} />
      <EventDate date={item.moveInDate} />
      <GalleryCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />
      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </motion.li>
  );
};

const SmallEvent = ({ item, ref, colorPair }) => {
  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      className={`${styles.item}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
        };
      }}
    >
      <EventType item={item} />
      <EventDate date={item.startDate} />
      <EventTitle title={item.title} />
    </motion.li>
  );
};

const MediumEvent = ({ item, isExpanded, onClick, ref, colorPair }) => {
  const [isExpandable, setIsExpandable] = useState(item.info);
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
      id={item?.slug?.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${styles.upcoming} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
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
      <EventType event={item} />
      <EventDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <EventTitle title={item.title} />
      <EventDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <EventLink event={item} />

      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </motion.li>
  );
};

const LargeEvent = ({ item, isExpanded, onClick, imageInView, ref, colorPair }) => {
  const { isMobile } = useContext(StateContext);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const isExpandable = item.gallery || item.info;

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

  if (!item) return undefined;

  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${item.past} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
          // transition: { duration: 0.5 },
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
      <EventType item={item} />
      <EventDate date={item.startDate} />
      <EventTitle title={item.title} />
      <GalleryCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />

      <EventExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </motion.li>
  );
};

export default AccordeonHeader;
