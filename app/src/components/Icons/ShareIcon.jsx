import Icon from "../Icon";
import styles from "./Icons.module.css";

import { handleShare } from "@/helpers/handleShare";

const ShareEvent = ({ url }) => {
  return (
    <div onClick={(e) => handleShare(e, url)}>
      <Icon className={styles.icon} path="/assets/icons/share.svg" />
    </div>
  );
};

export default ShareEvent;
