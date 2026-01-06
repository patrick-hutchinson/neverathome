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
import { useScrollToExpanded } from "./hooks/useScrollToExpand";

const AccordeonHeader = ({ item, size, isExpanded, onClick, imageInView, invert }) => {
  const { colorPairs } = useContext(StateContext);

  const randomColorPair = useMemo(() => {
    if (!colorPairs?.length) return null;

    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    return colorPairs[randomIndex];
  }, [colorPairs]);

  const colorPair = item.colorPair ?? randomColorPair;

  const ref = useRef(null);

  switch (size) {
    case "small":
      return <StaticHeader item={item} ref={ref} colorPair={colorPair} invert={invert} />;
    case "medium":
      return (
        <MediumExpand
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
        <LargeExpand
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

const ExpandableHeader = ({ styling, children, item, ref, onClick, invert, isExpanded, colorPair }) => (
  <motion.li
    id={item.slug.current}
    ref={ref}
    onClick={onClick}
    className={`${styles.item} ${invert ? styles.invert : ""} ${isExpanded && styles.expanded}`}
    whileHover={() => hoverColors(colorPair)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    styling={styling}
  >
    {children}
  </motion.li>
);

const hoverColors = (colorPair) => ({
  background: colorPair?.background?.value,
  color: colorPair?.text?.value,
  fill: colorPair?.text?.value,
  transition: { duration: 0.5 },
});

const getInvertColors = (invert) => ({
  background: invert ? "#fff" : "#000",
  text: invert ? "#000" : "#fff",
});

const StaticHeader = ({ item, ref, colorPair, invert }) => {
  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      className={`${styles.item} ${invert ? styles.invert : ""}`}
      whileHover={() => hoverColors(colorPair)}
    >
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <AccordeonTitle title={item.title} />
    </motion.li>
  );
};

const MediumExpand = ({ item, isExpanded, onClick, ref, colorPair, invert }) => {
  const [isExpandable, setIsExpandable] = useState(item.info);

  const { background, text } = getInvertColors(invert);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  useScrollToExpanded({ isExpanded, ref, offset: header_height + filter_height });

  const styling = {
    fill: isExpanded ? colorPair?.text.value : text,
    background: isExpanded ? colorPair?.background.value : background,
    color: isExpanded ? colorPair?.text.value : text,
  };

  if (!item) return undefined;

  return (
    <ExpandableHeader
      styling={styling}
      item={item}
      ref={ref}
      onClick={onClick}
      invert={invert}
      isExpanded={isExpanded}
      colorPair={colorPair}
    >
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <AccordeonTitle title={item.title} />
      <AccordeonDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordeonLink event={item} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </ExpandableHeader>
  );
};

const LargeExpand = ({ item, isExpanded, onClick, imageInView, ref, colorPair, invert }) => {
  const isExpandable = item.gallery || item.info;

  const { background, text } = getInvertColors(invert);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  // Scroll to Expanded Element
  useScrollToExpanded({ isExpanded, ref, offset: header_height + filter_height });

  const styling = {
    cursor: isExpandable ? "pointer" : "default",
    position: isExpanded && "sticky",
    top: 0,
    zIndex: 2,
    background: isExpanded ? colorPair?.background?.value ?? background : background,
    color: isExpanded ? colorPair?.text?.value ?? text : text,
    fill: isExpanded ? colorPair?.text?.value ?? background : background,
  };

  if (!item) return undefined;

  return (
    <ExpandableHeader
      styling={styling}
      item={item}
      ref={ref}
      onClick={onClick}
      invert={invert}
      isExpanded={isExpanded}
      colorPair={colorPair}
    >
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <AccordeonTitle title={item.title} />
      <AccordeonCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </ExpandableHeader>
  );
};

export default AccordeonHeader;
