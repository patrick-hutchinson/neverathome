import Collapse from "../Collapsible/Collapse";
import MediaPair from "../MediaPair/MediaPair";
import Text from "../Text";
import Gallery from "./Gallery/Gallery";

import styles from "./Accordion.module.css";
import { usePathname } from "next/navigation";

const AccordionContent = ({ item, mode, setActiveGalleryImage, containerRef, isExpanded }) => {
  const pathname = usePathname();

  const isAbout = pathname === "/about";
  return (
    <Collapse mode={mode} id={item._id} containerRef={containerRef}>
      <MediaPair className={styles.mediaPair}>
        <div className={`${styles.description} ${isAbout && styles.aboutPage}`}>
          <Text text={item.info} typo="h3" />
        </div>
        <Gallery event={item} className={styles.gallery} setActiveGalleryImage={setActiveGalleryImage} isExpanded={isExpanded} />
      </MediaPair>
    </Collapse>
  );
};

export default AccordionContent;
