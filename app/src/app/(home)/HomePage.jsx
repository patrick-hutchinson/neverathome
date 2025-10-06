"use client";

import styles from "./HomePage.module.css";
import MediaMarquee from "@/components/MediaMarquee/MediaMarquee";
import TextMarquee from "@/components/TextMarquee/TextMarquee";
import FeaturePreview from "@/components/FeaturePreview/FeaturePreview";
import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";

const HomePage = ({ data, site }) => {
  const Section = ({ children }) => {
    return <section className={styles.section}>{children}</section>;
  };

  return (
    <main>
      <ImageShuffle images={data.images} />

      <Section>
        <h3>Highlights</h3>
        <MediaMarquee highlights={data.highlights} />
      </Section>

      <Section>
        <h3>Calendar</h3>
        <ul>
          {data.events.map((event, index) => (
            <CalendarEntry key={index} event={event} colors={site.colorPairs} />
          ))}
        </ul>
      </Section>

      <Section>
        <h3>Features</h3>
        <MediaPair>
          {data.features.map((feature, index) => (
            <FeaturePreview key={index} feature={feature} />
          ))}
        </MediaPair>
      </Section>

      <TextMarquee className={styles.marquee} text="NeverAtHome" fontSize={130} />
    </main>
  );
};

export default HomePage;
