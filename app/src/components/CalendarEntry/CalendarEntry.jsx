import styles from "./CalendarEntry.module.css";

import { motion } from "framer-motion";

import FormatDate from "../FormatDate";
import Media from "../Media";
import { usePathname } from "next/navigation";

const CalendarEntry = ({ event, colors }) => {
  const pathname = usePathname();
  const isWorkshopPage = pathname.includes("/workshops");
  return (
    <motion.li
      className={`${styles.event} ${isWorkshopPage ? styles.invert : null}`}
      whileHover={() => {
        const random = Math.floor(Math.random() * colors.length);
        return {
          background: colors[random].background.value,
          color: colors[random].text.value,
          transition: { duration: 0.5 },
        };
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span>{event.type}</span>
      <div style={{ display: "flex", flexDirection: "column", width: "170px" }}>
        <FormatDate date={event.startDate} />
        <Media medium={event.thumbnail} />
      </div>
      <span>{event.title}</span>
    </motion.li>
  );
};

export default CalendarEntry;
