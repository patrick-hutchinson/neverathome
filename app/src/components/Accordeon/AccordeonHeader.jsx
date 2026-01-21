import { useContext, useState } from "react";

import Media from "../Media";

import AccordeonTitle from "./AccordeonInfo/AccordeonTitle";
import AccordeonLink from "./AccordeonInfo/AccordeonLink";
import AccordeonDate from "./AccordeonInfo/AccordeonDate";
import AccordeonType from "./AccordeonInfo/AccordeonType";
import AccordeonExpand from "./AccordeonInfo/AccordeonExpand";
import AccordeonDescription from "./AccordeonInfo/AccordeonDescription";
import AccordeonCounter from "./AccordeonInfo/AccordeonCounter";

import styles from "./Accordeon.module.css";

import { lookUpAttributes } from "./lookUpAttributes";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

const AccordeonHeader = ({ item, size, isExpanded, imageInView }) => {
  const [isExpandable, setIsExpandable] = useState(item.gallery || item.info);

  const { title, date, meta } = lookUpAttributes(item);

  const contentProps = { item, isExpandable, setIsExpandable, isExpanded, imageInView };

  switch (size) {
    case "medium":
      return <MediumHeaderContent {...contentProps} />;
    case "large":
      return <LargeHeaderContent {...contentProps} title={title} date={date} meta={meta} />;
  }
};

const MediumHeaderContent = ({ item, isExpandable, setIsExpandable, isExpanded }) => {
  const { header_height, filter_height } = useContext(GlobalVariablesContext);
  return (
    <div
      className={styles.accordeonHeader}
      style={{
        position: isExpanded ? "sticky" : "relative",
        top: isExpanded ? header_height + filter_height : 0,
        background: "inherit",
        zIndex: 2,
      }}
    >
      <AccordeonType type={item.type} />
      <AccordeonDate date={item.startDate} />
      <Media objectFit="contain" className={styles.media} medium={item.thumbnail} />
      <AccordeonTitle title={item.title} />
      <AccordeonDescription event={item} setIsExpandable={setIsExpandable} isExpanded={isExpanded} />
      <AccordeonLink event={item} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} />
    </div>
  );
};

const LargeHeaderContent = ({ item, isExpandable, isExpanded, imageInView, title, date, meta }) => {
  const { header_height, filter_height } = useContext(GlobalVariablesContext);
  return (
    <div
      className={styles.accordeonHeader}
      style={{
        position: isExpanded ? "sticky" : "relative",
        top: isExpanded ? header_height + filter_height : 0,
        background: "inherit",
        zIndex: 2,
      }}
    >
      <AccordeonType type={meta} />
      <AccordeonDate date={date} />
      <AccordeonTitle title={title} />
      <AccordeonCounter item={item} imageInView={imageInView} isExpanded={isExpanded} />

      <AccordeonExpand isExpandable={isExpandable} isExpanded={isExpanded} item={item} />
    </div>
  );
};

export default AccordeonHeader;
