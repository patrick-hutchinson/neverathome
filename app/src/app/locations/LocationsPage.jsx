"use client";

import styles from "./LocationsPage.module.css";

import Text from "@/components/Text";
import Media from "@/components/Media";
import FormatDate from "@/components/FormatDate";
import { useEffect, useState } from "react";

import Collapse from "@/components/Collapsible/Collapse";

const LocationsPage = ({ locations }) => {
  let [expandedElement, setExpandedElement] = useState(locations[0]._id);

  const handleExpand = (id) => (expandedElement === id ? setExpandedElement(null) : setExpandedElement(id));

  const CurrentLocation = ({ location }) => <div>{location.currentLocation ? "Currently based" : "Interim use"}</div>;

  const DateRange = ({ location }) => (
    <div>
      <FormatDate date={location.moveInDate} />

      {location.moveOutDate && (
        <span>
          —<FormatDate date={location.moveOutDate} />
        </span>
      )}
    </div>
  );

  const Gallery = ({ location }) => (
    <ul className={styles.gallery}>
      {location.gallery?.map((medium, index) => (
        <li key={index}>
          <Media medium={medium} />
        </li>
      ))}
    </ul>
  );

  return (
    <main>
      <ul>
        {locations.map((location, index) => {
          let isExpanded = location._id === expandedElement;
          return (
            <li key={index} onClick={() => handleExpand(location._id)}>
              <div className={`${styles.preview} ${isExpanded ? styles.open : null}`}>
                <CurrentLocation location={location} />
                <DateRange location={location} />
                <div>{isExpanded ? "CLOSE" : "OPEN"}</div>
              </div>
              <Collapse isExpanded={isExpanded} id={location._id}>
                <div className={styles.content}>
                  <div
                    style={{
                      maxWidth: "500px",
                      marginLeft: "calc(200px + 3px)",
                      marginTop: "var(--margin)",
                      paddingRight: "var(--margin)",
                    }}
                  >
                    <Text text={location.description} fontSize="ff-t" />
                  </div>

                  <Gallery location={location} />
                </div>
              </Collapse>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default LocationsPage;
