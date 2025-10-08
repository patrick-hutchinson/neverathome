"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";

import styles from "./StudiosPage.module.css";
import CoverMedia from "@/components/CoverMedia";

const StudiosPage = ({ page, site }) => {
  console.log(page);
  return (
    <main>
      <section>
        <CoverMedia medium={page.thumbnail} />
        <Text text={page.description} />
      </section>

      <h3>Workshops</h3>

      {Array.from({ length: Math.ceil(page.studios.length / 2) }).map((_, index) => (
        <section key={index}>
          <MediaPair>
            {page.studios.slice(index * 2, index * 2 + 2).map((studio, index) => (
              <Figure key={index} item={studio} colors={site.colorPairs} ratio={4 / 3} />
            ))}
          </MediaPair>
        </section>
      ))}

      <section>
        <h2 style={{ display: "flex", flexDirection: "column" }}>
          Interested to be part of the family?
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Description" />
          <input placeholder="Emial" />
          Subscribe here
        </h2>
      </section>
    </main>
  );
};

export default StudiosPage;
