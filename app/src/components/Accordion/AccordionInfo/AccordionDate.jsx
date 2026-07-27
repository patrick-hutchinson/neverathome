import styles from "../Accordion.module.css";
import FormatDate from "@/components/FormatDate";

const AccordionDate = ({ date }) => (
  <div className={styles.date}>
    <FormatDate date={date} />
  </div>
);

export default AccordionDate;
