import styles from "./Calendar.module.css";

const EventType = ({ event }) => <div className={styles.type}>{event.type}</div>;

export default EventType;
