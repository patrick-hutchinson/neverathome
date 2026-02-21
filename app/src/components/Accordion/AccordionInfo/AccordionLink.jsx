import styles from "../Accordion.module.css";

const AccordionLink = ({ event }) => (
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

export default AccordionLink;
