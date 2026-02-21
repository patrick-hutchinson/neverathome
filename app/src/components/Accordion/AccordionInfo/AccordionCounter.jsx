import styles from "../Accordion.module.css";

const AccordionCounter = ({ item, activeGalleryImage, isExpanded }) => {
  if (!item?.gallery) return null;

  const rawIndex = activeGalleryImage?.id === item._id ? activeGalleryImage?.index : 0;
  const numericIndex = Number(rawIndex);
  const safeIndex = Number.isFinite(numericIndex) ? numericIndex : 0;
  const currentIndex = isExpanded ? Math.min(Math.max(safeIndex + 1, 1), item.gallery.length) : 1;

  return (
    <div className={styles.counter}>
      {currentIndex}/{item.gallery.length}
    </div>
  );
};

export default AccordionCounter;
