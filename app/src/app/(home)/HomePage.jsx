"use client";

import styles from "./HomePage.module.css";
import MediaMarquee from "@/components/MediaMarquee/MediaMarquee";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import EventHeader from "@/components/EventHeader/EventHeader";
import Figure from "@/components/Figure/Figure";
import { useEffect } from "react";

const HomePage = ({ data, site }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            <EventHeader key={index} event={event} />
          ))}
        </ul>
      </section>

      <section>
        <h3>Features</h3>
        <MediaPair>
          {data.features.map((feature, index) => (
            <Figure key={index} item={feature} />
          ))}
        </MediaPair>
      </section>

      <TextMarquee className={styles.marquee} text="NeverAtHome" fontSize="ff1" />
    </main>
  );
};

export default HomePage;
