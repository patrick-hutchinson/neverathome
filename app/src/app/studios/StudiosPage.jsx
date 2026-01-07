"use client";

import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";

import styles from "./StudiosPage.module.css";

import CoverMedia from "@/components/CoverMedia";

import Link from "next/link";
import AccordeonHeader from "@/components/Accordeon/AccordeonHeader";

const StudiosPage = ({ page }) => {
  return (
    <main>
      <CoverMedia media={page.gallery} />

      <div style={{ background: "#000", position: "relative", padding: "calc(var(--margin) / 2) var(--margin)" }}>
        <div style={{ minHeight: "calc(100vh - var(--header-height))" }}>
          <Text text={page.description} typo="h2" />
        </div>
        <section className={styles.features}>
          <h3>Extra Facilities</h3>

          {Array.from({ length: Math.ceil(page.studios.length / 2) }).map((_, index) => (
            <MediaPair key={index}>
              {page.studios.slice(index * 2, index * 2 + 2).map((studio, index) => (
                <Figure key={index} item={studio} ratio={4 / 3} />
              ))}
            </MediaPair>
          ))}
        </section>

        <section>
          <h3>Selected Events</h3>
          <ul>
            {page.events.map((item, index) => (
              <Link href={`/calendar#${item.slug.current}`}>
                <AccordeonHeader size="medium" key={index} item={item} invert={true} />
              </Link>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ display: "flex", flexDirection: "column" }}>
            Interested to be part of the family?
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
            <input placeholder="Description" />
            <input placeholder="Email" />
            Get in Touch
          </h2>
        </section>
      </div>
    </main>
  );
};

export default StudiosPage;
