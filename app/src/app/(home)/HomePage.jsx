"use client";

import styles from "./HomePage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import { MicroEvent, UpcomingEvent } from "@/components/Calendar/EventHeader";
import Figure from "@/components/Figure/Figure";
import { useEffect } from "react";
import MiniFigure from "@/components/MiniFigure/MiniFigure";

import { repeatArray } from "@/helpers/repeatArray";
import Link from "next/link";

const HomePage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <ImageShuffle images={data.images} />

      <section className={styles.section}>
        <h3>Highlights</h3>
        <Carousel>
          {repeatArray(data.highlights).map((item, index) => (
            <MiniFigure key={index} item={item} index={index} />
          ))}
        </Carousel>
      </section>

      <section>
        <h3>Calendar</h3>
        <ul>
          {data.events.map((event, index) => (
            <Link href="/calendar">
              <MicroEvent key={index} event={event} />
            </Link>
          ))}
        </ul>
      </section>

      <section>
        <h3>Features</h3>
        <MediaPair>
          {data.features.map((feature, index) => (
            <Figure key={index} item={feature} />
          ))}
        </MediaPair>
      </section>

      <TextMarquee className={styles.marquee} text="NeverAtHome" typo="h1" />
    </main>
  );
};

export default HomePage;
