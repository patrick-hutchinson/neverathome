import Collapse from "../Collapsible/Collapse";
import MediaPair from "../MediaPair/MediaPair";
import Text from "../Text";
import Gallery from "./Gallery/Gallery";

import { motion } from "framer-motion";
import styles from "./Accordeon.module.css";

const AccordeonContent = ({ item, isExpanded, setImageInView, containerRef }) => {
  return (
    <Collapse isExpanded={isExpanded} id={item._id}>
      <MediaPair className={styles.mediaPair}>
        <Text text={item.info} className={styles.description} typo="h3" />
        <Gallery event={item} containerRef={containerRef} className={styles.gallery} setImageInView={setImageInView} />
      </MediaPair>
    </Collapse>
  );
};

export default AccordeonContent;
