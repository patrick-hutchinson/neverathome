"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { PastEvent, UpcomingEvent } from "@/components/Calendar/EventHeader";
import Filtering from "@/components/Calendar/Filtering";
import Collapse from "@/components/Collapsible/Collapse";

import MediaPair from "@/components/MediaPair/MediaPair";
import Text from "@/components/Text";

import Gallery from "@/components/Calendar/Gallery";

import styles from "./CalendarPage.module.css";

import { motion } from "framer-motion";

const CalendarPage = ({ events }) => {
  let [expandedElement, setExpandedElement] = useState(null);

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

  let [finishedScroll, setFinishedScroll] = useState(false);
  const [currentlyInView, setCurrentlyInView] = useState(null);

  const handleContentScroll = (e) => {
    const el = e.target;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    console.log("Distance from bottom:", distanceFromBottom);

    if (distanceFromBottom === 0) {
      setFinishedScroll(true);
    } else {
      setFinishedScroll(false);
    }
  };

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
                    <UpcomingEvent isExpanded={isExpanded} event={event} onClick={() => handleExpand(event._id)} />
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
              {archived.map((event) => {
                let isExpanded = event._id === expandedElement;
                const isExpandable = event.gallery || event.info;

                return (
                  <motion.div
                    key={event._id}
                    onScroll={(e) => handleContentScroll(e)}
                    style={{
                      // position: isExpanded && !finishedScroll && "sticky",
                      top: isExpanded && "calc(var(--header-height) + var(--filter-height))",
                      overflowY: "scroll",
                      height:
                        isExpanded && "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (2 * 35px))))",
                      background: "#000",
                      pointerEvents: isExpandable ? "all" : "none",
                    }}
                  >
                    <PastEvent
                      event={event}
                      isExpanded={isExpanded}
                      onClick={() => handleExpand(event._id)}
                      currentlyInView={currentlyInView}
                    />
                    <Collapse isExpanded={isExpanded} id={event._id}>
                      <div
                        className={styles.content}
                        style={{
                          minHeight:
                            isExpanded &&
                            "calc(100vh - (calc(var(--header-height) + var(--filter-height) + (3 * 35px))))",
                          background: isExpanded ? event.colorPair?.background.value : "#000",
                          color: isExpanded ? event.colorPair?.text.value : "#fff",
                          transition: "0.5s",
                        }}
                      >
                        <MediaPair className={styles.mediaPair}>
                          <Text text={event.info} className={styles.description} typo="h3" />
                          <Gallery event={event} className={styles.gallery} setCurrentlyInView={setCurrentlyInView} />
                        </MediaPair>
                      </div>
                    </Collapse>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </section>
      </div>
    </main>
  );
};

export default CalendarPage;
