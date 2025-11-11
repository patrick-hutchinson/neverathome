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
  const [mounted, setMounted] = useState(false); // 👈 tracks client mount
  const { isMobile } = useContext(StateContext);
  const preview = useRef(null);

  const [showImage, setShowImage] = useState(false);

  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    setMounted(true);
    setPortalRoot(document.getElementById("hover-preview"));
  }, []);

  // const portalRoot = typeof window !== "undefined" ? document.getElementById("hover-preview") : null;

  useEffect(() => {
    if (!isMobile) return;

    let timeout;

    const handleScroll = () => {
      setShowImage(true);
      console.log("showing image");
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

  useEffect(() => {
    console.log("show image");
  }, [showImage]);

  return (
    <main className={styles.main}>
      <Text text={contact.bio} typo="h2" />
      {mounted &&
        portalRoot &&
        createPortal(
          <AnimatePresence>
            <motion.div
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
