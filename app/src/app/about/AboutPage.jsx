"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";

import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";

import ContactCard from "@/components/ContactCard/ContactCard";
import { useState } from "react";

import FadePresence from "@/components/FadePresence";

const AboutPage = ({ contact }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <main className={styles.main}>
      <Text text={contact.bio} typo="h2" />

      {showImage && (
        <FadePresence className={styles.image} motionKey="image">
          <Media medium={contact.image} />
        </FadePresence>
      )}

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
