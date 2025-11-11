"use client";

import styles from "./Footer.module.css";

import Text from "@/components/Text";
import { StateContext } from "@/context/StateContext";
import Link from "next/link";

import React, { useContext } from "react";

const year = new Date().getFullYear();

const Footer = ({ site }) => {
  const { isMobile } = useContext(StateContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div>
          <a href={site.googleMaps} target="_blank">
            <Text text={site.address} />
            <Text className={styles.openingHours} text={site.openingHours} />
          </a>
          {/* <Text text={site.openingHours} /> */}
          {site.email}
        </div>
        <div className={styles.newsletter}>
          Get the latest Updates, News & Stories
          <button className={styles.not_allowed}>Subscribe Here</button>
        </div>

        <div className={styles.linktree}>
          <Link href="/linktree">Link Tree</Link>
        </div>
      </div>

      <div className={`${styles.legal}`} typo="h4">
        <div>
          <div>{`${site.title} © ${year}`}</div>
        </div>
        <div />
        <div className={styles.external} style={{ display: "flex" }}>
          <span style={{ marginRight: "4px" }}>
            <Link href="/imprint">Imprint</Link>
            {", "}
          </span>
          {isMobile ? (
            <div className={styles.socials}>
              <Link href="/linktree">Link Tree</Link>
            </div>
          ) : (
            <ul className={styles.socials}>
              {site.socials.map((social, index) => (
                <li key={index}>
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    {social.platform}
                  </a>
                  {index < site.socials.length - 1 && ", "}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
