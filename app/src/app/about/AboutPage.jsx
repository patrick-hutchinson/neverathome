"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { repeatArray } from "@/helpers/repeatArray";
import { StateContext } from "@/context/StateContext";

import Media from "@/components/Media";
import Text from "@/components/Text";
import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import ContactCard from "@/components/ContactCard/ContactCard";
import Accordeon from "@/components/Accordeon/Accordeon";
import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";
import CallToAction from "@/components/CallToAction";

const AboutPage = ({ contact, locations, site }) => {
  const { isMobile } = useContext(StateContext);

  useEffect(() => {
    if (!isMobile) return;

    let timeout;

    const handleScroll = () => {
      setShowImage(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => setShowImage(false), 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true }); // 👈 key line

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      clearTimeout(timeout);
    };
  }, [isMobile]);

  const permanentStaff = contact.teamMembers.filter((member) => member.position === "permanentStaff");
  const temporaryStaff = contact.teamMembers.filter((member) => member.position === "temporaryStaff");

  return (
    <main className={styles.main}>
      <Text className={styles.bio} text={contact.bio} typo="h2" />

      <section className={styles.accordeon}>
        <Accordeon array={locations} size="large" invert={true} behavior="expand" firstExpanded={true}></Accordeon>
      </section>

      <MediaPair>
        <TextFigure item={contact} />
        <Media medium={contact.image} />
      </MediaPair>

      <section>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--margin)", marginTop: "50px" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Carousel speed={0.5}>
              {repeatArray(permanentStaff).map((item, index) => (
                <ContactCard key={index} item={item} index={index} typo="h4" />
              ))}
            </Carousel>
          </div>

          <hr style={{ border: "0.2px solid #fff" }} />

          <div style={{ display: "flex", alignItems: "flex-start", opacity: 0.4 }}>
            <Carousel speed={1} direction="backward">
              {repeatArray(temporaryStaff).map((item, index) => (
                <ContactCard key={index} item={item} index={index} typo="h4" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section>
        <CallToAction site={site} prompt={"Be Part of the Community?"} />
      </section>
    </main>
  );
};

export default AboutPage;
