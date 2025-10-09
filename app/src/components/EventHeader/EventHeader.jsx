import styles from "./EventHeader.module.css";

import { motion } from "framer-motion";

import FormatDate from "../FormatDate";
import Media from "../Media";
import { usePathname } from "next/navigation";

const EventHeader = ({ event, isExpanded, isExpandable, onClick }) => {
  console.log(event);
  const pathname = usePathname();
  const isWorkshopPage = pathname.includes("/workshops");
  return (
    <motion.li
      onClick={onClick}
      className={`${styles.event} ${isWorkshopPage ? styles.invert : null}`}
      whileHover={() => {
        return {
          background: event.colorPair?.background.value,
          color: event.colorPair?.text.value,
          transition: { duration: 0.5 },
        };
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ cursor: isExpandable ? "pointer" : "default" }}
    >
      <span>{event.type}</span>
      <div style={{ display: "flex", flexDirection: "column", width: "170px", gap: "10px" }}>
        <FormatDate date={event.startDate} />
        <Media medium={event.thumbnail} />
      </div>
      <span>{event.title}</span>
      {isExpandable && <div className={styles.expand}>{isExpanded ? "CLOSE" : "OPEN"}</div>}
    </motion.li>
  );
};

export default EventHeader;
