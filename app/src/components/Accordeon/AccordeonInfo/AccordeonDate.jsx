import styles from "../Accordeon.module.css";
import FormatDate from "@/components/FormatDate";

const AccordeonDate = ({ date }) => (
  <div className={styles.date}>
    <FormatDate date={date} />
  </div>
);

export default AccordeonDate;
