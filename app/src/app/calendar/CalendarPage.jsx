"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";

import { StateContext } from "@/context/StateContext";

import Event from "@/components/Calendar/Event";
import Filtering from "@/components/Calendar/Filtering";

import ArchivedEvent from "@/components/Calendar/ArchivedEvent";

import styles from "./CalendarPage.module.css";

import { motion } from "framer-motion";

const CalendarPage = ({ events }) => {
  let [eventInView, setEventInView] = useState(null);
  const { expandedElement, setExpandedElement } = useContext(StateContext);

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
  const archived = filteredEvents
    .filter((event) => new Date(event.endDate || event.startDate) < now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const current = filteredEvents
    .filter((event) => new Date(event.endDate || event.startDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // 3️⃣ Find pinned event
  const pinned = events.find((event) => event.pinned);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

  const [imageInView, setImageInView] = useState(null);

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
        {pinned && (
          <div className={styles.pinned} style={{ pointerEvents: "none" }}>
            <CurrentEvent event={pinned} />
          </div>
        )}

        <section>
          <ul className={styles.calendar_section}>
            <AnimatePresence>
              {current.map((event) => {
                let isExpanded = event._id === expandedElement;

                return (
                  <div key={event._id}>
                    <Event
                      size="medium"
                      isExpanded={isExpanded}
                      event={event}
                      onClick={() => handleExpand(event._id)}
                      setEventInView={setEventInView}
                    />
                  </div>
                );
              })}
            </AnimatePresence>
          </ul>
        </section>

        <section>
          <h3>Archived</h3>
          <motion.ul className={styles.calendar_section}>
            <AnimatePresence>
              {archived.map((event) => (
                <ArchivedEvent
                  key={event._id}
                  event={event}
                  isExpanded={event._id === expandedElement}
                  handleExpand={handleExpand}
                  imageInView={imageInView}
                  setEventInView={setEventInView}
                  setImageInView={setImageInView}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </section>
      </div>
    </main>
  );
};

export default CalendarPage;
