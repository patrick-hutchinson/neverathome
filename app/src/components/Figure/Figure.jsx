import Media from "../Media";
import styles from "./Figure.module.css";

import Text from "@/components/Text";

const Figure = ({ item }) => {
  return (
    <div className={styles.figure}>
      <header className={`${styles.header} ff4`}>
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
      <div className={styles.media}>
        <Media medium={item.thumbnail} />
      </div>
      <Text text={item.description} />
    </div>
  );
};

export default Figure;
