"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";
import MediaPair from "@/components/MediaPair/MediaPair";
import InteractiveFigure from "@/components/InteractiveFigure/InteractiveFigure";

import styles from "./StudiosPage.module.css";

const StudiosPage = ({ page, site }) => {
  console.log(page);
  return (
    <main>
      <section>
        <div className={styles.media}>
          <Media medium={page.thumbnail} />
        </div>
        <Text text={page.description} />
      </section>

      <h3>Workshops</h3>

      {Array.from({ length: Math.ceil(page.studios.length / 2) }).map((_, index) => (
        <section key={index}>
          <MediaPair>
            {page.studios.slice(index * 2, index * 2 + 2).map((studio, index) => (
              <InteractiveFigure key={index} item={studio} colors={site.colorPairs} />
            ))}
          </MediaPair>
        </section>
      ))}
    </main>
  );
};

export default StudiosPage;
