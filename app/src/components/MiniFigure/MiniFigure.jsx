import Text from "@/components/Text";
import Media from "@/components/Media";

import styles from "./MiniFigure.module.css";
import AnimationLink from "../Animation/AnimationLink";

const MiniFigure = ({ item, index, invert }) => {
  return (
    <li key={index} className={styles.slide}>
      <AnimationLink link={item.link}>
        <header className={`${styles.header}`} typo="h4">
          <span>{item.tag}</span>
          <ul className={styles.links}>{item.headerLabel}</ul>
        </header>
        <div className={`${item.imageIsSmall ? styles.smallImage : ""} ${styles.media} ${invert ? styles.invert : ""} `}>
          <Media medium={item.thumbnail} />
        </div>
        <div className={styles.text}>
          <Text text={item.description} />
        </div>
      </AnimationLink>
    </li>
  );
};

export default MiniFigure;
