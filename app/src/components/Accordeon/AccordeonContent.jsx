import Collapse from "../Collapsible/Collapse";
import MediaPair from "../MediaPair/MediaPair";
import Text from "../Text";
import Gallery from "./Gallery/Gallery";

import styles from "./Accordeon.module.css";
import { usePathname } from "next/navigation";

const AccordeonContent = ({ item, mode, setImageInView, containerRef, isExpanded }) => {
  const pathname = usePathname();

  const isAbout = pathname === "/about";
  return (
    <Collapse mode={mode} id={item._id} containerRef={containerRef}>
      <MediaPair className={styles.mediaPair}>
        <div className={`${styles.description} ${isAbout && styles.aboutPage}`}>
          <Text text={item.info} typo="h3" />
        </div>
        <Gallery event={item} className={styles.gallery} setImageInView={setImageInView} isExpanded={isExpanded} />
      </MediaPair>
    </Collapse>
  );
};

export default AccordeonContent;
