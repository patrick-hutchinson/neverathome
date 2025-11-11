import styles from "./Calendar.module.css";

const GalleryCounter = ({ event, imageInView, isExpanded }) => {
  if (!event.gallery) return null;

  const currentIndex = isExpanded ? imageInView + 1 : 1;

  return (
    <div className={styles.counter}>
      {currentIndex}/{event.gallery.length}
    </div>
  );
};

export default GalleryCounter;
