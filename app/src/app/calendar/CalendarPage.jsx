"use client";

import EventHeader from "@/components/EventHeader/EventHeader";
import Filtering from "@/components/Filtering/Filtering";

import styles from "./CalendarPage.module.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Collapse from "@/components/Collapsible/Collapse";
import Media from "@/components/Media";
import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";

const CalendarPage = ({ events }) => {
  let [expandedElement, setExpandedElement] = useState(null);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

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
    .filter((event) => event.endDate && new Date(event.endDate) < now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const current = filteredEvents
    .filter((event) => !event.endDate || new Date(event.endDate) >= now)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // 3️⃣ Find pinned event
  const pinned = events.find((event) => event.pinned);

  const Gallery = ({ event }) => (
    <ul className={styles.gallery}>
      {event.gallery?.map((medium, index) => (
        <li key={index}>
          <Media medium={medium} />
        </li>
      ))}
    </ul>
  );

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
          <div className={styles.pinned}>
            <EventHeader event={pinned} />
          </div>
        )}

        <section>
          <h3>Current</h3>
          <ul className={styles.calendar_section}>
            <AnimatePresence>
              {current.map((event) => {
                const isExpandable = event.info;
                let isExpanded = event._id === expandedElement;

                return (
                  <div key={event.id}>
                    <EventHeader
                      event={event}
                      isExpandable={isExpandable}
                      isExpanded={isExpanded}
                      onClick={() => handleExpand(event._id)}
                    />
                    <Collapse isExpanded={isExpanded} id={event._id}>
                      <div className={styles.content}>
                        <Text text={event.info} className={styles.info} fontSize="ff-t" />
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </AnimatePresence>
          </ul>
        </section>

        <section>
          <h3>Archived</h3>
          <ul className={styles.calendar_section}>
            <AnimatePresence>
              {archived.map((event) => {
                const isExpandable = event.gallery || event.info || event.report;
                let isExpanded = event._id === expandedElement;

                return (
                  <div key={event._id}>
                    <EventHeader
                      event={event}
                      isExpandable={isExpandable}
                      isExpanded={isExpanded}
                      onClick={() => handleExpand(event._id)}
                    />
                    <Collapse isExpanded={isExpanded} id={event._id}>
                      <div className={styles.content}>
                        <MediaPair>
                          <div
                            style={{
                              marginLeft: "calc(195px)",
                              position: "sticky",
                              top: "0",
                            }}
                          >
                            <Text text={event.report} fontSize="ff-t" />
                          </div>
                          <Gallery event={event} />
                        </MediaPair>
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </AnimatePresence>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default CalendarPage;
