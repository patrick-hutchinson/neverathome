import styles from "./Calendar.module.css";

const GalleryCounter = ({ event, imageInView }) => {
  if (!event.gallery) return undefined;
  return (
    <div className={styles.counter}>
      {imageInView + 1}/{event.gallery?.length}
    </div>
  );
};

export default GalleryCounter;
