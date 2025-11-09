import styles from "./Calendar.module.css";
import FormatDate from "../FormatDate";

const EventDate = ({ event }) => (
  <div className={styles.date}>
    <FormatDate date={event.startDate} />
  </div>
);

export default EventDate;
