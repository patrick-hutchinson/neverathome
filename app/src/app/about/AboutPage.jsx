"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";

import { createPortal } from "react-dom";

import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";

import ContactCard from "@/components/ContactCard/ContactCard";
import { useState, useEffect, useRef, useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FadePresence from "@/components/FadePresence";
import { StateContext } from "@/context/StateContext";

const AboutPage = ({ contact }) => {
  const { isMobile } = useContext(StateContext);
  const preview = useRef(null);

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

  const portalRoot = typeof window !== "undefined" ? document.getElementById("hover-preview") : null;

  return (
    <main className={styles.main}>
      <Text text={contact.bio} typo="h2" />
      {/* <FadePresence className={styles.image} motionKey="image">
        {showImage && <Media medium={contact.image} />}
      </FadePresence> */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key={contact.image}
              ref={preview}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 10,
                cursor: "none",
              }}
            >
              <FadePresence className={styles.image} motionKey="image">
                {showImage && <Media medium={contact.image} />}
              </FadePresence>
            </motion.div>
          </AnimatePresence>,
          portalRoot
        )}
      <div style={{ display: "flex", alignItems: "flex-end", marginTop: "var(--margin)" }}>
        <Carousel speed={0.5}>
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
