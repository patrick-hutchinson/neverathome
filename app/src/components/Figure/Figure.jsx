import { useState } from "react";
import Media from "../Media";
import styles from "./Figure.module.css";

import Text from "@/components/Text";

import { motion } from "framer-motion";

const Figure = ({ item, ratio }) => {
  const [hovered, setHovered] = useState(false);

  console.log(item, "figure");

  return (
    <div className={styles.figure}>
      <motion.div
        className={styles.media_wrapper}
        style={{ position: "relative", aspectRatio: ratio }}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && item.colorPair && (
          <motion.div
            className={styles.card}
            style={{
              background: item.colorPair?.background.value,
              color: item.colorPair?.text.value,
              transition: { duration: 0 },
            }}
          >
            <h2>{item.title}</h2>
          </motion.div>
        )}
        <header className={`${styles.header}`} typo="h4">
          <span>{item.tag}</span>
          <ul className={styles.links}>
            {item.links?.map((link, index) => (
              <li key={index}>
                <a href={link.link} target="_blank">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </header>
        <div className={styles.media} style={{ aspectRatio: ratio }}>
          <Media medium={item.thumbnail} />
        </div>
      </motion.div>

      <Text text={item.description} className={styles.description} />
    </div>
  );
};

export default Figure;
