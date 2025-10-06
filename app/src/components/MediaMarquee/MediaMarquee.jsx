import { easeInOut, motion } from "framer-motion";

import Media from "@/components/Media";
import Text from "@/components/Text";

import styles from "./MediaMarquee.module.css";

const MediaMarquee = ({ highlights }) => {
  console.log(highlights);

  // Duplicate to allow for infinite looping
  const duplicate = [...highlights, ...highlights];

  return (
    <div className={styles.marquee_outer}>
      <motion.ul
        className={styles.marquee_inner}
        animate={{ x: ["0%", "-25%", "-50%", "-75%", "-100%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: easeInOut,
            duration: 12, // total duration of one loop
          },
        }}
      >
        {duplicate.map((highlight, index) => {
          return (
            <li key={index} className={styles.marqueeItem}>
              <header className={`${styles.header} ff4`}>
                <span>{highlight.tag}</span>
                <ul className={styles.links}>
                  {highlight.links?.map((link, index) => (
                    <li key={index}>
                      <a href={link.link} target="_blank">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </header>
              <div className={styles.media}>
                <Media medium={highlight.thumbnail} />
              </div>
              <Text text={highlight.description} />
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default MediaMarquee;
