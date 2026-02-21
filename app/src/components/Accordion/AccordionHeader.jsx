import { useContext, useState } from "react";

import Media from "../Media/Media";

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

const getSlug = (item) => {
  if (!item || typeof item !== "object") return null;
  const slug = item.slug;
  if (!slug || typeof slug !== "object") return null;
  return typeof slug.current === "string" ? slug.current : null;
};

const AccordionHeader = ({ item, size, isExpanded, activeGalleryImage }) => {
  if (!item) return null;
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
  if (!item) return null;
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const isEvent = item._type === "event";
  const slug = getSlug(item);
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
      <Media objectFit="contain" className={`${styles.small} ${styles.media}`} medium={item.thumbnail} />
      <AccordionTitle title={item.title} />
      <AccordionDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordionLink event={item} />

      <div style={{ display: "flex", gap: "var(--margin)" }} className={styles.icons}>
        {isEvent && slug && <ShareEvent url={`/calendar#${slug}`} />}
        <AccordionExpand className={styles.expand} isExpandable={isExpandable} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

const LargeHeaderContent = ({ item, isExpandable, isExpanded, activeGalleryImage, title, date, meta }) => {
  if (!item) return null;
  const pathname = usePathname();

  const isAbout = pathname === "/about";

  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const distance = isAbout ? header_height : header_height + filter_height;

  const isEvent = item._type === "event";
  const slug = getSlug(item);
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
        {isEvent && slug && <ShareEvent url={`/calendar#${slug}`} />}
        <AccordionExpand className={styles.expand} isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
      </div>
    </div>
  );
};

export default AccordionHeader;
