import Collapse from "../Collapsible/Collapse";
import MediaPair from "../MediaPair/MediaPair";
import Text from "../Text";
import Gallery from "./Gallery/Gallery";

import { motion } from "framer-motion";
import styles from "./Accordeon.module.css";

const AccordeonContent = ({ item, isExpanded, setImageInView, containerRef, colorPair }) => {
  return (
    <Collapse isExpanded={isExpanded} id={item._id}>
      <motion.div
        className={styles.content}
        style={{
          minHeight: isExpanded && "var(--accordeon-content-height)",
          background: isExpanded && colorPair.background?.value,
          color: isExpanded && colorPair.text?.value,
          transition: "0.5s",
        }}
      >
        <MediaPair className={styles.mediaPair}>
          <Text text={item.info} className={styles.description} typo="h3" />
          <Gallery
            event={item}
            containerRef={containerRef}
            className={styles.gallery}
            setImageInView={setImageInView}
          />
        </MediaPair>
      </motion.div>
    </Collapse>
  );
};

export default AccordeonContent;
