"use client";

import styles from "./HomePage.module.css";
import MediaMarquee from "@/components/MediaMarquee/MediaMarquee";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";
import Figure from "@/components/Figure/Figure";

const HomePage = ({ data, site }) => {
  return (
    <main>
      <ImageShuffle images={data.images} />

      <section className={styles.section}>
        <h3>Highlights</h3>
        <MediaMarquee highlights={data.highlights} />
      </section>

      <section>
        <h3>Calendar</h3>
        <ul>
          {data.events.map((event, index) => (
            <CalendarEntry key={index} event={event} colors={site.colorPairs} />
          ))}
        </ul>
      </section>

      <section>
        <h3>Features</h3>
        <MediaPair>
          {data.features.map((feature, index) => (
            <Figure key={index} item={feature} colors={site.colorPairs} />
          ))}
        </MediaPair>
      </section>

      <TextMarquee className={styles.marquee} text="NeverAtHome" fontSize={130} />
    </main>
  );
};

export default HomePage;
