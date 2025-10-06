"use client";

import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";

import styles from "./CalendarPage.module.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const CalendarPage = ({ events, site }) => {
  const [query, setQuery] = useState("");

  // Find all event types
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
  ];

  // Create an array that stores the active filters
  let [activeTypes, setActiveTypes] = useState([...types]);
  let [activeYears, setActiveYears] = useState([...years]);

  function handleTypes(type) {
    setActiveTypes(
      (prev) =>
        prev.includes(type)
          ? prev.filter((t) => t !== type) // remove if already active
          : [...prev, type] // add if not active
    );
  }

  function handleYears(year) {
    setActiveYears(
      (prev) =>
        prev.includes(year)
          ? prev.filter((t) => t !== year) // remove if already active
          : [...prev, year] // add if not active
    );
  }

  const FilterMenu = () => {
    return (
      <form className={styles.filterMenu}>
        <fieldset>
          {types.map((type, index) => (
            <span key={index}>
              <button onClick={() => handleTypes(type)} className={activeTypes.includes(type) ? styles.active : ""}>
                {type}
              </button>
              {index < types.length - 1 && ", "}
            </span>
          ))}
        </fieldset>

        <fieldset>
          {years.map((year, index) => (
            <span key={index}>
              <button onClick={() => handleYears(year)} className={activeYears.includes(year) ? styles.active : ""}>
                {year}
              </button>
              {index < years.length - 1 && ", "}
            </span>
          ))}
        </fieldset>

        <label>
          Search:
          <input type="search" name="q" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </form>
    );
  };

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
    <div>
      <FilterMenu />

      <div className={styles.calendar}>
        <h3>Pinned:</h3>
        <div className={styles.pinned}>
          <CalendarEntry event={pinned} colors={site.colorPairs} />
        </div>

        <h3>Current</h3>
        <ul>
          <AnimatePresence>
            {current.map((event) => (
              <CalendarEntry key={event._id} event={event} colors={site.colorPairs} />
            ))}
          </AnimatePresence>
        </ul>

        <h3>Archived</h3>
        <ul>
          <AnimatePresence>
            {archived.map((event) => (
              <CalendarEntry key={event._id} event={event} colors={site.colorPairs} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
