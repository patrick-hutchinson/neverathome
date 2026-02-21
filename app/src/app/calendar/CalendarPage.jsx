"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { StateContext } from "@/context/StateContext";

import Filtering from "@/components/Calendar/Filtering";

import styles from "./CalendarPage.module.css";

import { motion } from "framer-motion";
import Accordion from "@/components/Accordion/Accordion";

import { scrollToHash } from "@/helpers/scrollToHash";
import { GlobalVariablesContext } from "@/context/GlobalVariablesContext";

const CalendarPage = ({ events }) => {
  const { setActiveItemId } = useContext(StateContext);
  const { header_height, filter_height } = useContext(GlobalVariablesContext);

  const [query, setQuery] = useState("");

  // Find all occuring event types
  const types = [...new Set(events.map((event) => event.type))];

  // Find all occuring years
  const years = [
    ...new Set(
      events.flatMap((event) => {
        const years = [];
        if (event.startDate) years.push(new Date(event.startDate).getFullYear());
        if (event.endDate) years.push(new Date(event.endDate).getFullYear());
        return years;
      }),
    ),
  ].sort((a, b) => a - b);

  // Create an array that stores the active filters
  let [activeTypes, setActiveTypes] = useState([...types]);
  let [activeYears, setActiveYears] = useState([...years]);

  const now = new Date();

  // 1️⃣ Filter events by active type & year
  const filteredEvents = events.filter((event) => {
    if (!event) return;

    const eventYears = [];
    if (event.startDate) eventYears.push(new Date(event.startDate).getFullYear());
    if (event.endDate) eventYears.push(new Date(event.endDate).getFullYear());

    const matchesType = activeTypes.includes(event.type);
    const matchesYear = eventYears.some((year) => activeYears.includes(year));

    const matchesQuery = event.title?.toLowerCase().includes(query?.toLowerCase());

    return matchesType && matchesYear && matchesQuery;
  });

  // 2️⃣ Split filtered events into current & archived
  const archived = filteredEvents
    .filter((event) => new Date(event.endDate || event.startDate) < now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const current = filteredEvents
    .filter((event) => new Date(event.endDate || event.startDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // 3️⃣ Find pinned event
  const pinned = events.find((event) => event.pinned);

  useEffect(() => {
    if (header_height === 0 || filter_height === 0) return;

    const hash = window.location.hash; // includes the '#' character

    const cleanHash = hash ? hash.substring(1) : null; // remove the '#'

    const activeEvent = events.find((event) => event?.slug?.current === cleanHash);

    if (activeEvent) setActiveItemId(activeEvent._id);

    scrollToHash(-1 * (filter_height + header_height));
  }, [header_height, filter_height]);

  return (
    <main className={styles.main}>
      <Filtering
        types={types}
        years={years}
        query={query}
        setQuery={setQuery}
        activeTypes={activeTypes}
        activeYears={activeYears}
        setActiveTypes={setActiveTypes}
        setActiveYears={setActiveYears}
      />

      <div className={styles.calendar}>
        {pinned && (
          <div className={styles.pinned} style={{ pointerEvents: "none" }}>
            <CurrentEvent event={pinned} />
          </div>
        )}

        <section>
          <ul className={styles.calendar_section}>
            <AnimatePresence>
              <Accordion array={current} size={"medium"} behavior="expand" />
            </AnimatePresence>
          </ul>
        </section>

        <section>
          <h3>Archived</h3>
          <motion.ul className={styles.calendar_section}>
            <Accordion array={archived} size={"large"} behavior="expand" />
          </motion.ul>
        </section>
      </div>
    </main>
  );
};

export default CalendarPage;
