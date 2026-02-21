"use client";

import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";
import CoverMedia from "@/components/CoverMedia";
import Accordion from "@/components/Accordion/Accordion";
import CallToAction from "@/components/CallToAction/CallToAction";

import styles from "./StudiosPage.module.css";

const StudiosPage = ({ page, site }) => {
  return (
    <main>
      <CoverMedia media={page.gallery} />

      <div style={{ background: "#000", position: "relative", padding: "calc(var(--margin) / 2) var(--margin)" }}>
        <div style={{ marginBottom: "250px" }}>
          <Text className={styles.introduction} text={page.description} typo="h2" />
        </div>
        <section className={styles.features}>
          <h3>Selected Artist Studios</h3>

          {Array.from({ length: Math.ceil(page.studios.length / 2) }).map((_, index) => (
            <MediaPair key={index}>
              {page.studios.slice(index * 2, index * 2 + 2).map((studio, index) => (
                <Figure key={index} item={studio} ratio={4 / 3} />
              ))}
            </MediaPair>
          ))}
        </section>

        <section>
          <h3>Public Studio Tours</h3>
          <Accordion array={page.events} behavior="navigate" invert={true} size="medium" />
        </section>

        <section>
          <CallToAction site={site} prompt={"Interested to rent your own studio?"} />
        </section>
      </div>
    </main>
  );
};

export default StudiosPage;
