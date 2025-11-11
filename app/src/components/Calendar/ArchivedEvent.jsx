import { useRef } from "react";
import { motion } from "framer-motion";

import Collapse from "../Collapsible/Collapse";
import Gallery from "./Gallery";
import Event from "./Event";
import Text from "../Text";
import MediaPair from "../MediaPair/MediaPair";

import styles from "@/app/calendar/CalendarPage.module.css";

const ArchivedEvent = ({ event, isExpanded, handleExpand, imageInView, setEventInView, setImageInView }) => {
  const containerRef = useRef(null);
  const isExpandable = event.gallery || event.info;

  return (
    <motion.div
      ref={containerRef}
      style={{
        overflowY: "scroll",
        height:
          isExpanded && "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (2 * var(--list-height)))))",
        background: "#000",
        pointerEvents: isExpandable ? "all" : "none",
        overflowX: "hidden",
      }}
    >
      <Event
        size="large"
        event={event}
        isExpanded={isExpanded}
        onClick={() => handleExpand(event._id)}
        imageInView={imageInView}
        setEventInView={setEventInView}
      />
      <Collapse isExpanded={isExpanded} id={event._id}>
        <div
          className={styles.content}
          style={{
            minHeight: isExpanded && "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (3 * 35px))))",
            background: isExpanded ? event.colorPair?.background?.value ?? "#000" : "#000",
            color: isExpanded ? event.colorPair?.text?.value ?? "#fff" : "#fff",
            transition: "0.5s",
          }}
        >
          <MediaPair className={styles.mediaPair}>
            <Text text={event.info} className={styles.description} typo="h3" />
            <Gallery
              event={event}
              containerRef={containerRef}
              className={styles.gallery}
              setImageInView={setImageInView}
            />
          </MediaPair>
        </div>
      </Collapse>
    </motion.div>
  );
};

export default ArchivedEvent;
