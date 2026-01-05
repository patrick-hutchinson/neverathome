import { useEffect, useRef, useState } from "react";
import { useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";
import { StateContext } from "@/context/StateContext";

import Media from "../Media";

import AccordeonTitle from "./AccordeonItem/AccordeonTitle";
import AccordeonLink from "./AccordeonItem/AccordeonLink";
import AccordeonDate from "./AccordeonItem/AccordeonDate";
import AccordeonType from "./AccordeonItem/AccordeonType";
import AccordeonExpand from "./AccordeonItem/AccordeonExpand";
import AccordeonDescription from "./AccordeonItem/AccordeonDescription";
import AccordeonCounter from "./AccordeonItem/AccordeonCounter";

import styles from "./Accordeon.module.css";

const AccordeonHeader = ({ item, size, isExpanded, onClick, imageInView, invert }) => {
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
        invert={invert}
      />
    );

  switch (size) {
    case "small":
      return <SmallEvent item={item} ref={ref} colorPair={colorPair} invert={invert} />;
    case "medium":
      return (
        <MediumEvent
          item={item}
          ref={ref}
          isExpanded={isExpanded}
          onClick={onClick}
          colorPair={colorPair}
          invert={invert}
        />
      );
    case "large":
      return (
        <LargeEvent
          item={item}
          ref={ref}
          isExpanded={isExpanded}
          onClick={onClick}
          imageInView={imageInView}
          colorPair={colorPair}
          invert={invert}
        />
      );
  }
};

const LocationHeader = ({ item, isExpanded, onClick, imageInView, ref, colorPair, invert }) => {
  const { header_height } = useContext(GlobalVariablesContext);

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

  const backgroundColor = invert ? "#fff" : "#000";
  const textColor = invert ? "#000" : "#fff";

  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${invert ? styles.invert : ""} ${styles.past} ${isExpanded && styles.expanded}`}
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
        background: isExpanded ? colorPair?.background?.value ?? backgroundColor : backgroundColor,
        color: isExpanded ? colorPair?.text?.value ?? textColor : textColor,
        fill: isExpanded ? colorPair?.text?.value ?? textColor : textColor,
      }}
    >
      <AccordeonType type={item.currentLocation ? "Currently here!" : "We've moved!"} />
      <AccordeonTitle title={item.title} />
      <AccordeonDate date={item.moveInDate} />
      <AccordeonCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />
      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </motion.li>
  );
};

const SmallEvent = ({ item, ref, colorPair, invert }) => {
  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      className={`${styles.item} ${invert ? styles.invert : ""}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
        };
      }}
    >
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <AccordeonTitle title={item.title} />
    </motion.li>
  );
};

const MediumEvent = ({ item, isExpanded, onClick, ref, colorPair, invert }) => {
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

  const backgroundColor = invert ? "#fff" : "#000";
  const textColor = invert ? "#000" : "#fff";

  return (
    <motion.li
      id={item?.slug?.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${invert ? styles.invert : ""} ${styles.upcoming} ${isExpanded && styles.expanded}`}
      whileHover={() => {
        return {
          background: colorPair?.background.value,
          color: colorPair?.text.value,
          fill: colorPair?.text.value,
        };
      }}
      style={{
        fill: isExpanded ? colorPair?.text.value : textColor,
        background: isExpanded ? colorPair?.background.value : backgroundColor,
        color: isExpanded ? colorPair?.text.value : textColor,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AccordeonType event={item} />
      <AccordeonDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <AccordeonTitle title={item.title} />
      <AccordeonDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordeonLink event={item} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </motion.li>
  );
};

const LargeEvent = ({ item, isExpanded, onClick, imageInView, ref, colorPair, invert }) => {
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

  console.log(invert, "inverted?");

  const backgroundColor = invert ? "#fff" : "#000";
  const textColor = invert ? "#000" : "#fff";

  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${invert ? styles.invert : ""} ${item.past} ${isExpanded && styles.expanded}`}
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
        background: isExpanded ? colorPair?.background?.value ?? backgroundColor : backgroundColor,
        color: isExpanded ? colorPair?.text?.value ?? textColor : textColor,
        fill: isExpanded ? colorPair?.text?.value ?? backgroundColor : backgroundColor,
      }}
    >
      <AccordeonType item={item} />
      <AccordeonDate date={item.startDate} />
      <AccordeonTitle title={item.title} />
      <AccordeonCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </motion.li>
  );
};

export default AccordeonHeader;
