"use client";

import styles from "./Footer.module.css";

import Text from "@/components/Text";
import { StateContext } from "@/context/StateContext";
import Link from "next/link";

import React, { useContext } from "react";
import AnimationLink from "../Animation/AnimationLink";
import FooterLogos from "./components/FooterLogos";

import { handleDownload } from "@/helpers/handleDownload";

const year = new Date().getFullYear();

const Footer = ({ site }) => {
  const workshopSpaceFile = site?.workshopSpaceFile?.asset?.url ? site.workshopSpaceFile : null;

  return (
    <footer className={styles.footer}>
      <div className={styles.address}>
        <a href={site.googleMaps} target="_blank">
          <Text text={site.address} />
          {/* <Text className={styles.openingHours} text={site.openingHours} /> */}
        </a>
        {site.email}
      </div>

      <div className={styles.inHouseLinks}>
        <div className={styles.newsletter}>
          Get the latest Updates, News & Stories
          <br />
          <a href={`https://newsletter.${site.domain}/subscription/form`} target="_blank">
            Subscribe Here
          </a>
        </div>

        <div className={styles.mediaLinks}>
          {workshopSpaceFile && <a onClick={() => handleDownload(workshopSpaceFile)}>Rent a Workshop Space</a>}
          <AnimationLink path="/linktree">Go to Linktree</AnimationLink>
          {site.presskitLink && (
            <a href={site.presskitLink} target="_blank">
              Download Presskit
            </a>
          )}
          {site.mediaarchiveLink && (
            <a href={site.mediaarchiveLink} target="_blank">
              Mediaarchive
            </a>
          )}
        </div>
      </div>

      <div className={styles.principalPartners}>
        <div className={styles.heading} typo="h4">
          Public Principal Partner
        </div>
        <FooterLogos logos={site.footerLogosFixed} />
      </div>

      <div className={styles.generalPartners}>
        <div className={styles.heading} typo="h4">
          General Partner
        </div>
        <FooterLogos logos={site.footerLogosInterchangeable} />
      </div>

      <div className={styles.pageCopyright} typo="h4">
        <div>{`${site.title} © ${year}`}</div>
      </div>

      <div className={styles.imprint} style={{ display: "flex" }} typo="h4">
        <span style={{ marginRight: "4px" }}>
          <Link href="/imprint">Imprint</Link>,
        </span>

        <ul className={styles.socials}>
          {site.socials.map((social, index) => (
            <li key={index}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                {social.platform}
              </a>
              {index < site.socials.length - 1 && <span>,&nbsp;</span>}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
