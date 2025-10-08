"use client";

import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";
import Filtering from "@/components/Filtering/Filtering";

import styles from "./CalendarPage.module.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Collapse from "@/components/Collapsible/Collapse";

const CalendarPage = ({ events, site }) => {
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
      })
    ),
  ].sort((a, b) => a - b);

  // Create an array that stores the active filters
  let [activeTypes, setActiveTypes] = useState([...types]);
  let [activeYears, setActiveYears] = useState([...years]);

  const now = new Date();

  // 1️⃣ Filter events by active type & year
  const filteredEvents = events.filter((event) => {
    const eventYears = [];
    if (event.startDate) eventYears.push(new Date(event.startDate).getFullYear());
    if (event.endDate) eventYears.push(new Date(event.endDate).getFullYear());

    const matchesType = activeTypes.includes(event.type);
    const matchesYear = eventYears.some((year) => activeYears.includes(year));

    const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase());

    return matchesType && matchesYear && matchesQuery;
  });

  // 2️⃣ Split filtered events into current & archived
  const archived = filteredEvents.filter((event) => event.endDate && new Date(event.endDate) < now);
  const current = filteredEvents.filter((event) => !event.endDate || new Date(event.endDate) >= now);

  // 3️⃣ Find pinned event
  const pinned = events.find((event) => event.pinned);

  return (
    <main>
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
        <div className={styles.pinned}>
          <CalendarEntry event={pinned} colors={site.colorPairs} />
        </div>

        <ul className={styles.calendar_section}>
          <AnimatePresence>
            {current.map((event) => (
              <CalendarEntry key={event._id} event={event} colors={site.colorPairs} />
            ))}
          </AnimatePresence>
        </ul>

        <h3>Archived</h3>
        <ul className={styles.calendar_section}>
          <AnimatePresence>
            {archived.map((event) => (
              <div key={event._id}>
                <CalendarEntry event={event} colors={site.colorPairs} />
                <Collapse>
                  <div className={styles.content}></div>
                </Collapse>
              </div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </main>
  );
};

export default CalendarPage;
