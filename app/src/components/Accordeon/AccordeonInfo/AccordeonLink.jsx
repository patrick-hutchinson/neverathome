import styles from "../Accordeon.module.css";

const AccordeonLink = ({ event }) => (
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

export default AccordeonLink;
