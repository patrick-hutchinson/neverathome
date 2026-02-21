import { useState } from "react";
import Media from "../Media/Media";
import styles from "./Figure.module.css";

import Text from "@/components/Text";

import { AnimatePresence, motion } from "framer-motion";
import AnimationLink from "../Animation/AnimationLink";

// import { Link } from "sanity-plugin-link-field/component";

const Figure = ({ item, ratio }) => {
  if (!item) return;
  const [hovered, setHovered] = useState(false);

  const Wrapper = item?.link ? AnimationLink : "div";
  const props = item?.link ? { link: item.link } : "";

  return (
    <div className={styles.figure}>
      <Wrapper {...props}>
        <motion.div
          className={styles.media_wrapper}
          style={{ position: "relative", aspectRatio: ratio }}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence key="figure">
            {((hovered && item.useHoverEffect) || !item?.thumbnail) && item?.colorPair && (
              <motion.div
                className={styles.card}
                initial={{ opacity: !item.thumbnail ? 0 : 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: item.colorPair?.background.value,
                  color: item.colorPair?.text.value,
                }}
              >
                <h2>{item.title}</h2>
              </motion.div>
            )}
          </AnimatePresence>
          <header className={`${styles.header}`} typo="h4">
            <span>{item?.tag}</span>
            <div>{item?.headerLabel}</div>
          </header>
          {item?.thumbnail && (
            <div className={styles.media} style={{ aspectRatio: ratio }}>
              <Media medium={item.thumbnail} />
            </div>
          )}
        </motion.div>
      </Wrapper>

      <Text typo="h3" text={item.description} className={styles.description} />
    </div>
  );
};

export default Figure;
