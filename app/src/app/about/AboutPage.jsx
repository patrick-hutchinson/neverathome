"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";

import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";

import ContactCard from "@/components/ContactCard/ContactCard";
import { useState, useEffect, useRef, useContext } from "react";

import { StateContext } from "@/context/StateContext";

import Accordeon from "@/components/Accordeon/Accordeon";

import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";

const AboutPage = ({ contact, locations }) => {
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

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Carousel speed={1} direction="backward">
              {repeatArray(temporaryStaff).map((item, index) => (
                <ContactCard key={index} item={item} index={index} typo="h4" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ display: "flex", flexDirection: "column" }}>
          Want to Drink a Coffee with us?
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Description" />
          <input placeholder="Email" />
          Get in Touch
        </h2>
      </section>
    </main>
  );
};

export default AboutPage;
