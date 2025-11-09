import styles from "./Calendar.module.css";

const EventTitle = ({ event }) => <div className={styles.title}>{event.title}</div>;

export default EventTitle;
