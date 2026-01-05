import styles from "./Calendar.module.css";
import FormatDate from "../FormatDate";

const EventDate = ({ date }) => (
  <div className={styles.date}>
    <FormatDate date={date} />
  </div>
);

export default EventDate;
