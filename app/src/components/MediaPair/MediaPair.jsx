import styles from "./MediaPair.module.css";

const MediaPair = ({ children, className }) => {
  return <div className={`${className} ${styles.container}`}>{children}</div>;
};

export default MediaPair;
