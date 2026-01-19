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
import { lookUpAttributes } from "./lookUpAttributes";
import Link from "next/link";
import AnimationLink from "../Animation/AnimationLink";

const AccordeonHeader = ({ item, size, isExpanded, onClick, imageInView, invert, colorPair, behavior }) => {
  const ref = useRef(null);
  const [isExpandable, setIsExpandable] = useState(item.gallery || item.info);

  const { title, date, meta } = lookUpAttributes(item);

  const headerProps = { item, ref, onClick, invert, isExpanded, colorPair, isExpandable };
  const contentProps = { item, isExpandable, setIsExpandable, isExpanded, imageInView };

  const Wrapper = behavior === "expand" ? ExpandWrapper : NavigationWrapper;

  switch (size) {
    case "medium":
      return (
        <Wrapper {...headerProps}>
          <MediumHeaderContent {...contentProps} />
        </Wrapper>
      );
    case "large":
      return (
        <Wrapper {...headerProps}>
          <LargeHeaderContent {...contentProps} title={title} date={date} meta={meta} />
        </Wrapper>
      );
  }
};

const hoverColors = (colorPair) => ({
  background: colorPair?.background?.value,
  color: colorPair?.text?.value,
  fill: colorPair?.text?.value,
  transition: { duration: 0.5 },
});

const getColors = (invert) => ({
  background: invert ? "#fff" : "#000",
  text: invert ? "#000" : "#fff",
});

const ExpandWrapper = ({ children, item, ref, onClick, invert, isExpandable, isExpanded, colorPair }) => {
  const { background, text } = getColors(invert);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  useScrollToExpanded({ isExpanded, ref, offset: header_height + filter_height });

  return (
    <motion.li
      id={item.slug.current}
      ref={ref}
      onClick={onClick}
      className={`${styles.item} ${invert ? styles.invert : ""} ${isExpanded && styles.expanded}`}
      whileHover={hoverColors(colorPair)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        cursor: isExpandable ? "pointer" : "default",
        position: isExpanded && "sticky",
        top: 0,
        zIndex: 2,
        background: isExpanded ? colorPair?.background?.value ?? background : background,
        color: isExpanded ? colorPair?.text?.value ?? text : text,
        fill: isExpanded ? colorPair?.text?.value ?? background : background,
      }}
    >
      {children}
    </motion.li>
  );
};

const NavigationWrapper = ({ children, invert, ref, item, colorPair }) => {
  const { background, text } = getColors(invert);

  return (
    <AnimationLink path={`/calendar#${item.slug.current}`}>
      <motion.div
        id={item.slug.current}
        className={`${styles.item} ${invert ? styles.invert : ""}`}
        ref={ref}
        whileHover={hoverColors(colorPair)}
        style={{
          background: background,
          color: text,
          fill: background,
        }}
      >
        {children}
      </motion.div>
    </AnimationLink>
  );
};

const MediumHeaderContent = ({ item, isExpandable, setIsExpandable, isExpanded }) => {
  return (
    <>
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <AccordeonTitle title={item.title} />
      <AccordeonDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordeonLink event={item} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </>
  );
};

const LargeHeaderContent = ({ item, isExpandable, isExpanded, imageInView, title, date, meta }) => {
  return (
    <>
      <AccordeonType type={meta} />
      <AccordeonDate date={date} />
      <AccordeonTitle title={title} />
      <AccordeonCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </>
  );
};

export default AccordeonHeader;
