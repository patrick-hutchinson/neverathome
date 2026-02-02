"use client";

import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";

import styles from "./StudiosPage.module.css";

import CoverMedia from "@/components/CoverMedia";

import Link from "next/link";
import AccordeonHeader from "@/components/Accordeon/AccordeonHeader";
import Accordeon from "@/components/Accordeon/Accordeon";

const StudiosPage = ({ page, site }) => {
  return (
    <main>
      <CoverMedia media={page.gallery} />

      <div style={{ background: "#000", position: "relative", padding: "calc(var(--margin) / 2) var(--margin)" }}>
        <div style={{ marginBottom: "250px" }}>
          <Text text={page.description} typo="h2" />
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
          <h3>Studio Tours</h3>
          <Accordeon array={page.events} behavior="navigate" invert={true} size="medium" />
        </section>

        <section>
          <h2 style={{ display: "flex", flexDirection: "column" }}>
            Interested to rent your own studio?
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

export default StudiosPage;
