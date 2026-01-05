"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";
import AccordeonHeader from "@/components/Accordeon/AccordeonHeader";

import Carousel from "@/components/Carousel/Carousel";

import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";

import styles from "./ProgrammingPage.module.css";
import CoverMedia from "@/components/CoverMedia";

import { repeatArray } from "@/helpers/repeatArray";

import Link from "next/link";
import MiniFigure from "@/components/Slide/Slide";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

const ProgrammingPage = ({ page, site }) => {
  console.log("page:", page);
  return (
    <main>
      <CoverMedia media={page.gallery} />

      <div style={{ background: "#000", position: "relative", padding: "calc(var(--margin) / 2) var(--margin)" }}>
        <section>
          <div typo="h2">
            <Text text={page.description} />
          </div>
        </section>

        <section className={styles.section}>
          <h3>Highlights</h3>
          <Carousel>
            {repeatArray(page.highlights).map((item, index) => (
              <MiniFigure key={index} item={item} index={index} />
            ))}
          </Carousel>
        </section>

        <section className={styles.residencies}>
          <MediaPair>
            <TextFigure item={page.residencies} />
            <Media medium={page.residencies.thumbnail} />
          </MediaPair>
          <TextMarquee
            text="We host binaual residency programs, lending our space to creatives with a vision to create and a need for reseources."
            typo="h3"
            duration={30}
          />
        </section>

        <section>
          <h2>
            Interested to host your own? <br />
            Write us an{" "}
            <a href={`mailto:${site.email}`} target="_blank">
              email
            </a>
            !
          </h2>
        </section>

        <section>
          <h3>Selected Events</h3>
          <ul>
            {page.events.map((item, index) => (
              <AccordeonHeader size="medium" key={index} item={item} />
            ))}
          </ul>
          <h2 style={{ marginTop: "20px" }}>
            <Link href="/calendar">Go to the Calendar</Link>
          </h2>
        </section>
      </div>
    </main>
  );
};

export default ProgrammingPage;
