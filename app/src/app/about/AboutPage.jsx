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

import { StateContext } from "@/context/StateContext";

import Accordeon from "@/components/Accordeon/Accordeon";

const AboutPage = ({ contact, locations }) => {
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

  console.log(permanentStaff, "permanent staff");

  return (
    <main className={styles.main}>
      <div className={styles.introduction_wrapper}>
        <Text text={contact.bio} typo="h2" />
        {mounted &&
          portalRoot &&
          showImage &&
          createPortal(
            <AnimatePresence>
              <motion.div
                ref={preview}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                style={{
                  height: "auto",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 15,
                }}
              >
                <Media medium={contact.image} />
              </motion.div>
            </AnimatePresence>,
            portalRoot
          )}

        <div>
          <div style={{ display: "flex", alignItems: "flex-end", marginTop: "var(--margin)" }}>
            <Carousel speed={0.5}>
              {repeatArray(permanentStaff).map((item, index) => (
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

          <div style={{ display: "flex", alignItems: "flex-start", marginTop: "var(--margin)" }}>
            {temporaryStaff.map((item, index) => (
              <ContactCard
                key={index}
                item={item}
                index={index}
                typo="h4"
                onMouseEnter={() => setShowImage(true)}
                onMouseLeave={() => setShowImage(false)}
              />
            ))}
          </div>
        </div>
      </div>

      <section className={styles.accordeon}>
        <h3>Locations</h3>
        <Accordeon array={locations} size="large" invert={true}></Accordeon>
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
