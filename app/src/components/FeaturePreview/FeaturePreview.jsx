import Media from "../Media";
import styles from "./FeaturePreview.module.css";

import Text from "@/components/Text";

const Feature = ({ feature }) => {
  return (
    <div className={styles.feature}>
      <header className={`${styles.header} ff4`}>
        <span>{feature.tag}</span>
        <ul className={styles.links}>
          {feature.links?.map((link, index) => (
            <li key={index}>
              <a href={link.link} target="_blank">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <div className={styles.media}>
        <Media medium={feature.thumbnail} />
      </div>
      <Text text={feature.description} />
    </div>
  );
};

export default Feature;
