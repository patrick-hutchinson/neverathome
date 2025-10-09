"use client";

import Text from "@/components/Text";
import EventHeader from "@/components/EventHeader/EventHeader";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";

import styles from "./WorkshopPage.module.css";

const WorkshopPage = ({ page, events, site }) => {
  console.log(page);
  const workshops = events.filter((event) => event.type === "Workshop");

  return (
    <main>
      <section className={styles.introduction}>
        <h2>
          <Text text={page.description} />
          <div className={styles.facilities}>
            <h4>Facilities</h4>
            <ul>
              {page.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
        </h2>
        <div className="two-column">
          <Text text={page.subtext} />
        </div>
      </section>

      <section>
        <h3>Selected Events</h3>
        <ul>
          {workshops.map((event, index) => (
            <EventHeader key={index} event={event} />
          ))}
        </ul>
        <h2 style={{ marginTop: "20px" }}>
          <a href="/calendar">Go to the Calendar</a>
        </h2>
      </section>

      <section>
        <h3>Features</h3>
        {Array.from({ length: Math.ceil(page.features.length / 2) }).map((_, i) => (
          <div key={i} className={styles.feature_container}>
            <MediaPair>
              {page.features.slice(i * 2, i * 2 + 2).map((feature, index) => (
                <Figure key={index} item={feature} />
              ))}
            </MediaPair>
          </div>
        ))}
      </section>
    </main>
  );
};

export default WorkshopPage;
