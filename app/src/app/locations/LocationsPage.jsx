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

  return (
    <main>
      <ul>
        {locations.map((location, index) => {
          return (
            <li key={index} onClick={() => handleExpand(location._id)}>
              <div className={styles.preview}>
                <div>{location.currentLocation ? "Currently based" : "Interim use"}</div>
                <div>
                  <FormatDate date={location.moveInDate} />
                  {location.moveOutDate && (
                    <span>
                      —<FormatDate date={location.moveOutDate} />
                    </span>
                  )}
                </div>
                <div>{location._id === expandedElement ? "CLOSE" : "OPEN"}</div>
              </div>
              <Collapse isExpanded={expandedElement === location._id} id={location._id}>
                <div className={styles.content}>
                  <Text text={location.description} />

                  <ul className={styles.gallery}>
                    {location.gallery?.map((medium, index) => (
                      <li key={index}>
                        <Media medium={medium} />
                      </li>
                    ))}
                  </ul>
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
