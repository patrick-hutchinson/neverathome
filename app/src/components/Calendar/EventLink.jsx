import styles from "./Calendar.module.css";

const EventLink = ({ event }) => (
  <div className={styles.link}>
    {event.ticketLink ? (
      <a href={event.ticketLink} target="_blank">
        Tickets
      </a>
    ) : (
      <div>Free Entry</div>
    )}
  </div>
);

export default EventLink;
