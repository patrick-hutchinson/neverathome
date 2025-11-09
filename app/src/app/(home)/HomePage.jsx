"use client";

import styles from "./HomePage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import Event from "@/components/Calendar/Event";
import Figure from "@/components/Figure/Figure";
import { useContext, useEffect } from "react";
import MiniFigure from "@/components/MiniFigure/MiniFigure";

import { repeatArray } from "@/helpers/repeatArray";

import { useRouter } from "next/navigation";
import { StateContext } from "@/context/StateContext";

const HomePage = ({ data }) => {
  const router = useRouter();

  const { setExpandedElement } = useContext(StateContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (event) => {
    setExpandedElement(event._id);
    router.push(`/calendar/#${event.slug.current}`, { scroll: false });
  };

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
            <div key={index} onClick={() => handleNavigation(event)}>
              <Event size="medium" event={event} />
            </div>
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
