import Collapse from "../Collapsible/Collapse";
import MediaPair from "../MediaPair/MediaPair";
import Text from "../Text";
import Gallery from "./Gallery/Gallery";

import styles from "./Accordeon.module.css";

const AccordeonContent = ({ item, isExpanded, containerRef, setImageInView }) => {
  return (
    <Collapse isExpanded={isExpanded} id={item._id}>
      <div
        className={styles.content}
        style={{
          minHeight: isExpanded && "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (3 * 35px))))",
          background: isExpanded ? item.colorPair?.background?.value ?? "#000" : "#000",
          color: isExpanded ? item.colorPair?.text?.value ?? "#fff" : "#fff",
          transition: "0.5s",
        }}
      >
        <MediaPair className={styles.mediaPair}>
          <Text text={item.info} className={styles.description} typo="h3" />
          {item.gallery ? (
            <Gallery
              event={item}
              containerRef={containerRef}
              className={styles.gallery}
              setImageInView={setImageInView}
            />
          ) : (
            <div />
          )}
        </MediaPair>
      </div>
    </Collapse>
  );
};

export default AccordeonContent;
