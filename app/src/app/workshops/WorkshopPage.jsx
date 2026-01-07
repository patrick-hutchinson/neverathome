"use client";

import Text from "@/components/Text";

import styles from "./WorkshopPage.module.css";
import AccordeonHeader from "@/components/Accordeon/AccordeonHeader";
import Carousel from "@/components/Carousel/Carousel";
import { repeatArray } from "@/helpers/repeatArray";
import MiniFigure from "@/components/MiniFigure/MiniFigure";
import Link from "next/link";

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
        <ul>
          {workshops.map((item, index) => (
            <Link href={`/calendar#${item.slug.current}`}>
              <AccordeonHeader size="medium" key={index} item={item} invert={true} />
            </Link>
          ))}
        </ul>
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
          Interested to host your own?
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

export default WorkshopPage;
