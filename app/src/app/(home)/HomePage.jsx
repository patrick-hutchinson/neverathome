"use client";

import styles from "./HomePage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import TextMarquee from "@/components/TextMarquee/TextMarquee";

import ImageShuffle from "@/components/ImageShuffle/ImageShuffle";

import MediaPair from "@/components/MediaPair/MediaPair";
import Figure from "@/components/Figure/Figure";
import { useContext, useEffect } from "react";
import MiniFigure from "@/components/MiniFigure/MiniFigure";

import { repeatArray } from "@/helpers/repeatArray";

import { useRouter } from "next/navigation";
import { StateContext } from "@/context/StateContext";
import Accordeon from "@/components/Accordeon/Accordeon";

const HomePage = ({ data }) => {
  const router = useRouter();

  const { setExpandedElement } = useContext(StateContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (event) => {
    setExpandedElement(event._id);
    router.push(`/calendar`);
  };

  return (
    <main className={styles.main}>
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
        <h3>Upcoming</h3>
        <Accordeon array={data.events} size="medium" />
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
