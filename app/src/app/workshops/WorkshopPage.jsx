"use client";

import Text from "@/components/Text";
import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";

import styles from "./WorkshopPage.module.css";

const WorkshopPage = ({ page, events, site }) => {
  console.log(page);
  const workshops = events.filter((event) => event.type === "Workshop");

  return (
    <main>
      <section>
        <h2>
          <Text text={page.description} />
        </h2>
      </section>

      <section>
        <h3>Selected Events</h3>
        <ul>
          {workshops.map((event, index) => (
            <CalendarEntry key={index} event={event} colors={site.colorPairs} />
          ))}
        </ul>
        <h2>
          <a href="/calendar">Go to the Calendar</a>
        </h2>
      </section>

      <h3>Workshops</h3>
      {Array.from({ length: Math.ceil(page.features.length / 2) }).map((_, i) => (
        <section key={i}>
          <MediaPair>
            {page.features.slice(i * 2, i * 2 + 2).map((feature, index) => (
              <Figure key={index} item={feature} />
            ))}
          </MediaPair>
        </section>
      ))}
    </main>
  );
};

export default WorkshopPage;
