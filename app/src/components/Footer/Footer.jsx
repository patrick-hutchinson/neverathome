"use client";

import styles from "./Footer.module.css";

import { usePathname } from "next/navigation";

import Text from "@/components/Text";

const year = new Date().getFullYear();

const Footer = ({ site }) => {
  const pathname = usePathname();

  const invertedPages = ["about", "contact", "calendar"];

  return (
    <footer
      className={`${styles.footer} ${invertedPages.some((page) => pathname.startsWith(`/${page}`)) ? "invert" : ""}`}
    >
      <div className={styles.main}>
        <div>
          <a href={site.googleMaps}>
            <Text text={site.address} />
          </a>
          {site.email}
        </div>
        <div className={styles.newsletter}>
          Get the latest Updates, News & Stories
          <input placeholder="Subscribe here" />
        </div>
        <div className={styles.resources}>
          <a href="#">Rental Rooms.pdf</a>
          <a href={site.googleMaps}>See Map</a>
        </div>
      </div>

      <div className={styles.legal}>
        <div>
          <div>{`${site.title} © ${year}`}</div>
        </div>
        <a href="#">Imprint</a>
        <ul>
          {site.socials.map((social, index) => (
            <li key={index}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                {social.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
