"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";
import Event from "@/components/Calendar/Event";

import MediaMarquee from "@/components/Carousel/Carousel";

import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";
import Figure from "@/components/Figure/Figure";
import styles from "./ProgrammingPage.module.css";
import CoverMedia from "@/components/CoverMedia";

const ProgrammingPage = ({ page, site }) => {
  console.log(page, "residencies");
  return (
    <main>
      <section>
        <CoverMedia medium={page.thumbnail} />

        <div className="two-column">
          <Text text={page.description} />
        </div>
      </section>

      <section>
        <h3>Highlights</h3>
        <MediaMarquee highlights={page.highlights} />
      </section>

      <section className={styles.residencies}>
        <MediaPair>
          <TextFigure item={page.residencies} />
          <Media medium={page.residencies.thumbnail} />
        </MediaPair>
      </section>

      <section>
        <h2>
          Interested to host your own? <br />
          Write us an <a href={`mailto:${site.email}`}>email</a>!
        </h2>
      </section>

      <section>
        <h3>Selected Events</h3>
        <ul>
          {page.events.map((event, index) => (
            <Event size="medium" key={index} event={event} />
          ))}
        </ul>
        <h2 style={{ marginTop: "20px" }}>
          <a href="/calendar">Go to the Calendar</a>
        </h2>
      </section>
    </main>
  );
};

export default ProgrammingPage;
