"use client";

import { repeatArray } from "@/helpers/repeatArray";

import Media from "@/components/Media/Media";
import Text from "@/components/Text";
import Carousel from "@/components/Carousel/Carousel";
import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";
import styles from "./ProgrammingPage.module.css";
import CoverMedia from "@/components/CoverMedia";
import MiniFigure from "@/components/MiniFigure/MiniFigure";
import TextMarquee from "@/components/TextMarquee/TextMarquee";
import Accordion from "@/components/Accordion/Accordion";
import CallToAction from "@/components/CallToAction/CallToAction";
import Figure from "@/components/Figure/Figure";

const ProgrammingPage = ({ page, site }) => {
  return (
    <main className={styles.main}>
      <CoverMedia media={page.gallery} />

      <div style={{ background: "#000", position: "relative", padding: "calc(var(--margin) / 2) var(--margin)" }}>
        <section>
          <div typo="h2">
            <Text className={styles.introduction} text={page.description} />
          </div>
        </section>

        <section className={styles.section}>
          <h3>Highlights</h3>
          <Carousel>
            {repeatArray(page.highlights).map((item, index) => (
              <MiniFigure key={index} item={item} index={index} invert={true} />
            ))}
          </Carousel>
        </section>

        <section>
          <h3>Selected Events</h3>
          <Accordion array={page.events} size="medium" behavior="navigate" invert={true} />
        </section>

        <section>
          <h3>Our Residencies</h3>
          <MediaPair>
            {page.features.map((item, index) => (
              <Figure key={index} item={item} />
            ))}
          </MediaPair>
        </section>

        {page.selectedResidencies && (
          <section>
            <h3>Selected Residencies</h3>
            <Accordion array={page.selectedResidencies} size="medium" behavior="navigate" invert={true} />
          </section>
        )}

        <section>
          <CallToAction site={site} prompt={"Any Questions?"} />
        </section>
      </div>
    </main>
  );
};

export default ProgrammingPage;
