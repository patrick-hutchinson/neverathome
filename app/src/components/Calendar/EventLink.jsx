import styles from "./Calendar.module.css";

const EventLink = ({ event }) => (
  <div className={styles.link}>
    {event.eventLink ? (
      <a href={event.eventLink} target="_blank">
        Tickets
      </a>
    ) : (
      <div>Free Entry</div>
    )}
  </div>
);

export default EventLink;
