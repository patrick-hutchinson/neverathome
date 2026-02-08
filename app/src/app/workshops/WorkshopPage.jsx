"use client";

import { repeatArray } from "@/helpers/repeatArray";

import Text from "@/components/Text";
import Carousel from "@/components/Carousel/Carousel";
import MiniFigure from "@/components/MiniFigure/MiniFigure";
import Accordeon from "@/components/Accordeon/Accordeon";
import CallToAction from "@/components/CallToAction/CallToAction";

import styles from "./WorkshopPage.module.css";

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
        <h3>Upcoming Workshops</h3>
        <Accordeon array={workshops} size="medium" invert={true} behavior="navigate" />
      </section>

      <section>
        <h3>Workshop Highlights</h3>
        <Carousel>
          {repeatArray(page.highlights).map((item, index) => (
            <MiniFigure key={index} item={item} index={index} invert={true} />
          ))}
        </Carousel>
      </section>

      <section>
        <CallToAction site={site} prompt={"Interested to Host your own Workshop?"} />
      </section>
    </main>
  );
};

export default WorkshopPage;
