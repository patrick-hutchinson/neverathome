"use client";

import Media from "@/components/Media";
import Text from "@/components/Text";
import CalendarEntry from "@/components/CalendarEntry/CalendarEntry";
import MediaMarquee from "@/components/MediaMarquee/MediaMarquee";

import styles from "./EventsPage.module.css";
import CoverMedia from "@/components/CoverMedia";

const EventsPage = ({ page, site }) => {
  return (
    <main>
      <section>
        <CoverMedia medium={page.thumbnail} />

        <div className="two-column">
          <Text text={page.description} />
        </div>
      </section>

      <section>
        <h3>Highlights</h3>
        <MediaMarquee highlights={page.highlights} />
      </section>

      <section>
        <h3>Selected Events</h3>
        <ul>
          {page.events.map((event, index) => (
            <CalendarEntry key={index} event={event} colors={site.colorPairs} />
          ))}
        </ul>
        <h2 style={{ marginTop: "20px" }}>
          <a href="/calendar">Go to the Calendar</a>
        </h2>
      </section>

      <section>
        <h2>
          Interested to host your own? <br />
          Write us an <a href={`mailto:${site.email}`}>email</a>!
        </h2>
      </section>
    </main>
  );
};

export default EventsPage;
