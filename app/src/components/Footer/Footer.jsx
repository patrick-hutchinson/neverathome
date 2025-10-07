"use client";

import styles from "./Footer.module.css";

import Text from "@/components/Text";

import React from "react";

const year = new Date().getFullYear();

const Footer = ({ site }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div>
          <a href={site.googleMaps}>
            <Text text={site.address} />
          </a>
          {site.email}
        </div>
        <div className={styles.newsletter}>
          Get the latest Updates, News & Stories
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input placeholder="Email" />
          <button>Subscribe</button>
        </div>
        <div className={styles.resources}>
          <a href="#">Rental Rooms.pdf</a>
          <a href={site.googleMaps}>See Map</a>
        </div>
      </div>

      <div className={`${styles.legal} ff4`}>
        <div>
          <div>{`${site.title} © ${year}`}</div>
        </div>
        <div />
        <div style={{ display: "flex" }}>
          <span style={{ marginRight: "4px" }}>
            <a href="#">Imprint</a>
            {", "}
          </span>
          <ul>
            {site.socials.map((social, index) => (
              <li key={index}>
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                  {social.platform}
                </a>
                {index < site.socials.length - 1 && ", "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
