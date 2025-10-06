import styles from "./CalendarEntry.module.css";

import { motion } from "framer-motion";

import FormatDate from "../FormatDate";

const CalendarEntry = ({ event, colors }) => {
  return (
    <motion.li
      className={styles.event}
      whileHover={() => {
        const random = Math.floor(Math.random() * colors.length);
        return {
          background: colors[random].background.value,
          color: colors[random].text.value,
          transition: { duration: 0 },
        };
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span>{event.type}</span>
      <FormatDate date={event.startDate} />
      <span>{event.title}</span>
    </motion.li>
  );
};

export default CalendarEntry;
