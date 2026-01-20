import styles from "../Accordeon.module.css";

const AccordeonCounter = ({ item, imageInView, isExpanded }) => {
  if (!item?.gallery) return null;

  const currentIndex = isExpanded ? imageInView + 1 : 1;

  return (
    <div className={styles.counter}>
      {currentIndex}/{item.gallery.length}
    </div>
  );
};

export default AccordeonCounter;
