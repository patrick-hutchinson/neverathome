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
import MiniFigure from "@/components/MiniFigure/MiniFigure";
import TextMarquee from "@/components/TextMarquee/TextMarquee";
import Accordeon from "@/components/Accordeon/Accordeon";

const ProgrammingPage = ({ page, site }) => {
  return (
    <main className={styles.main}>
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
              <MiniFigure key={index} item={item} index={index} invert={true} />
            ))}
          </Carousel>
        </section>

        <section>
          <h3>Selected Events</h3>
          <Accordeon array={page.events} size="medium" behavior="navigate" invert={true} />
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

        {/* ⚠️ Hier Residencies Feld einfügen */}
        <section>
          <h3>Selected Residencies</h3>
          <Accordeon array={page.events} size="medium" behavior="navigate" invert={true} />
        </section>

        <section>
          <h2 style={{ display: "flex", flexDirection: "column" }}>
            You wanna rent a space?
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
            <input placeholder="Description" />
            <input placeholder="Email" />
            <a href={`mailto:${site.email}`}>Get in Touch</a>
          </h2>
        </section>
      </div>
    </main>
  );
};

export default ProgrammingPage;
