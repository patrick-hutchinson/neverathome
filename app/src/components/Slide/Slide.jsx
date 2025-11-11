import Text from "@/components/Text";
import Media from "@/components/Media";

import styles from "./Slide.module.css";

const MiniFigure = ({ item, index }) => {
  return (
    <li key={index} className={styles.slide}>
      <header className={`${styles.header}`} typo="h4">
        <span>{item.tag}</span>
        <ul className={styles.links}>
          {item.links?.map((link, index) => (
            <li key={index}>
              <a href={link.link} target="_blank">
                {link.title} →
              </a>
            </li>
          ))}
        </ul>
      </header>
      <div className={`${item.imageIsSmall ? styles.smallImage : ""} ${styles.media}`}>
        <Media medium={item.thumbnail} />
      </div>
      <div className={styles.text}>
        <Text text={item.description} />
      </div>
    </li>
  );
};

export default MiniFigure;
