import Icon from "../Icon";
import styles from "./Icons.module.css";

import { handleShare } from "@/helpers/handleShare";

const ShareEvent = ({ url }) => {
  return (
    <div onClick={(e) => handleShare(e, url)}>
      <Icon className={styles.icon} path="/assets/icons/share.svg" height="10px" width="13.7px" />
    </div>
  );
};

export default ShareEvent;
