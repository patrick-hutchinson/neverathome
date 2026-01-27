"use client";

import Text from "@/components/Text";

import styles from "./WorkshopPage.module.css";

import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";
import MiniFigure from "@/components/MiniFigure/MiniFigure";
import Accordeon from "@/components/Accordeon/Accordeon";

const WorkshopPage = ({ page, events, site }) => {
  const workshops = events.filter((event) => event.type === "Workshop");

  return (
    <main className={styles.main}>
      <section className={styles.introduction}>
        <h2>
          <Text text={page.description} />
          <div className={styles.facilities}>
            <h4>Facilities</h4>
            <ul>
              {page.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
        </h2>
        <div className="two-column">
          <Text text={page.subtext} />
        </div>
      </section>

      <section>
        <h3>Selected Events</h3>
        <Accordeon array={workshops} size="medium" invert={true} behavior="navigate" />
      </section>

      <section>
        <h3>Highlights</h3>
        <Carousel>
          {repeatArray(page.highlights).map((item, index) => (
            <MiniFigure key={index} item={item} index={index} invert={true} />
          ))}
        </Carousel>
      </section>

      <section>
        <h2 style={{ display: "flex", flexDirection: "column" }}>
          Interested to host your own workshop?
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Description" />
          <input placeholder="Email" />
          <a href="mailto:welcome@never-at-home.at">Get in Touch</a>
        </h2>
      </section>
    </main>
  );
};

export default WorkshopPage;
