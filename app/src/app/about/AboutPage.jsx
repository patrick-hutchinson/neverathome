"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";

import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";

import ContactCard from "@/components/ContactCard/ContactCard";
import { useState, useEffect, useRef, useContext } from "react";

import FadePresence from "@/components/FadePresence";
import { StateContext } from "@/context/StateContext";

const AboutPage = ({ contact }) => {
  const { isMobile } = useContext(StateContext);

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    let timeout;

    const handleScroll = () => {
      setShowImage(true);
      clearTimeout(timeout); // clear previous timeout
      timeout = setTimeout(() => {
        setShowImage(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout); // cleanup
    };
  }, [isMobile]);

  return (
    <main className={styles.main}>
      <Text text={contact.bio} typo="h2" />
      <FadePresence className={styles.image} motionKey="image">
        {showImage && <Media medium={contact.image} />}
      </FadePresence>

      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "var(--margin)" }}>
        <Carousel>
          {repeatArray(contact.teamMembers).map((item, index) => (
            <ContactCard
              key={index}
              item={item}
              index={index}
              typo="h4"
              onMouseEnter={() => setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
            />
          ))}
        </Carousel>
      </div>
    </main>
  );
};

export default AboutPage;
