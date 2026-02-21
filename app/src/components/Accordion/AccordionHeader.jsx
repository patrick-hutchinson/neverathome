import { useContext, useState } from "react";

import Media from "../Media";

import AccordionTitle from "./AccordionInfo/AccordionTitle";
import AccordionLink from "./AccordionInfo/AccordionLink";
import AccordionDate from "./AccordionInfo/AccordionDate";
import AccordionType from "./AccordionInfo/AccordionType";
import AccordionExpand from "../Icons/ExpandIcon";
import AccordionDescription from "./AccordionInfo/AccordionDescription";
import AccordionCounter from "./AccordionInfo/AccordionCounter";
import ShareEvent from "@/components/Icons/ShareIcon";

import styles from "./Accordion.module.css";

import { getAccordionHeaderFields } from "./getAccordionHeaderFields";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";
import { usePathname } from "next/navigation";

const AccordionHeader = ({ item, size, isExpanded, activeGalleryImage }) => {
  const [isExpandable, setIsExpandable] = useState(item.gallery || item.info);

  const { title, date, meta } = getAccordionHeaderFields(item);

  const contentProps = { item, isExpandable, setIsExpandable, isExpanded, activeGalleryImage };

  switch (size) {
    case "medium":
      return <MediumHeaderContent {...contentProps} />;
    case "large":
      return <LargeHeaderContent {...contentProps} title={title} date={date} meta={meta} />;
  }
};

const MediumHeaderContent = ({ item, isExpandable, setIsExpandable, isExpanded }) => {
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const isEvent = item._type === "event";
  return (
    <div
      className={styles.accordionHeader}
      style={{
        position: isExpanded ? "sticky" : "relative",
        top: isExpanded ? header_height + filter_height : 0,
        background: "inherit",
        zIndex: 2,
      }}
    >
      <AccordionType type={item.type} />
      <AccordionDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <AccordionTitle title={item.title} />
      <AccordionDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordionLink event={item} />

      <div style={{ display: "flex", gap: "var(--margin)" }} className={styles.icons}>
        {isEvent && <ShareEvent url={`/calendar#${item.slug.current}`} />}
        <AccordionExpand className={styles.expand} isExpandable={isExpandable} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

const LargeHeaderContent = ({ item, isExpandable, isExpanded, activeGalleryImage, title, date, meta }) => {
  const pathname = usePathname();

  const isAbout = pathname === "/about";

  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const distance = isAbout ? header_height : header_height + filter_height;

  const isEvent = item._type === "event";
  return (
    <div
      className={styles.accordionHeader}
      style={{
        position: isExpanded ? "sticky" : "relative",
        top: isExpanded ? distance : 0,
        background: "inherit",
        zIndex: 2,
      }}
    >
      <AccordionType type={meta} />
      <AccordionDate date={date} />
      <AccordionTitle title={title} />
      <AccordionCounter item={item} activeGalleryImage={activeGalleryImage} isExpanded={isExpanded} />

      <div style={{ display: "flex", gap: "var(--margin)" }} className={styles.icons}>
        {isEvent && <ShareEvent url={`/calendar#${item.slug.current}`} />}
        <AccordionExpand className={styles.expand} isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
      </div>
    </div>
  );
};

export default AccordionHeader;
