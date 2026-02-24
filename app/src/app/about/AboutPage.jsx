"use client";

import { repeatArray } from "@/helpers/repeatArray";

import Media from "@/components/Media/Media";
import Text from "@/components/Text";
import styles from "./AboutPage.module.css";
import Carousel from "@/components/Carousel/Carousel";
import ContactCard from "@/components/ContactCard/ContactCard";
import Accordion from "@/components/Accordion/Accordion";
import MediaPair from "@/components/MediaPair/MediaPair";
import TextFigure from "@/components/TextFigure/TextFigure";
import CallToAction from "@/components/CallToAction/CallToAction";

const AboutPage = ({ contact, locations, site }) => {
  const permanentStaff = contact.teamMembers.filter((member) => member.position === "permanentStaff");
  const temporaryStaff = contact.teamMembers.filter((member) => member.position === "temporaryStaff");

  return (
    <main className={styles.main}>
      <Text className={styles.bio} text={contact.bio} typo="h2" />

      <section className={styles.accordion}>
        <Accordion array={locations} size="large" invert={true} behavior="expand" firstExpanded={true}></Accordion>
      </section>

      <MediaPair className={styles.mediaPair}>
        <TextFigure text={contact.doubleFeature_team.text} colorPair={contact.doubleFeature_team.colorPair} />
        <Media medium={contact.doubleFeature_team.image} />
      </MediaPair>

      <section>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--margin)", marginTop: "50px" }}>
          <h4>CORE TEAM</h4>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Carousel speed={0.5}>
              {repeatArray(permanentStaff).map((item, index) => (
                <ContactCard key={index} item={item} index={index} typo="h4" />
              ))}
            </Carousel>
          </div>

          <hr style={{ border: "0.2px solid #fff" }} />

          <h4>PROJECT BASED</h4>
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
        <MediaPair className={styles.mediaPair}>
          <TextFigure text={contact.doubleFeature_supporter.text} colorPair={contact.doubleFeature_supporter.colorPair} />
          <Media medium={contact.doubleFeature_supporter.image} />
        </MediaPair>
      </section>

      <section>
        <Accordion array={contact.supportAccordions} size="large" invert={true} behavior="expand" firstExpanded={false} />
      </section>

      <section className="callToAction">
        <CallToAction site={site} prompt={"Any Questions?"} />
      </section>
    </main>
  );
};

export default AboutPage;
