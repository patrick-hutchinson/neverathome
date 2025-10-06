import { useState } from "react";
import Media from "../Media";
import styles from "./InteractiveFigure.module.css";

import Text from "@/components/Text";

import { motion } from "framer-motion";

const InteractiveFigure = ({ item, colors }) => {
  const [random, setRandom] = useState(null);
  const [hovered, setHovered] = useState(false);
  return (
    <div className={styles.figure}>
      <motion.div
        className={styles.media_wrapper}
        style={{ position: "relative" }}
        onMouseEnter={() => {
          setRandom(Math.floor(Math.random() * colors.length));
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <motion.div
            className={styles.card}
            style={{
              background: colors[random].background.value,
              color: colors[random].text.value,
              transition: { duration: 0 },
            }}
          >
            <h2>{item.title}</h2>
          </motion.div>
        )}
        <div className={styles.media}>
          <Media medium={item.thumbnail} />
        </div>
      </motion.div>
      <Text text={item.description} />
    </div>
  );
};

export default InteractiveFigure;
