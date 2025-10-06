"use client";

import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.marquee}>
        <TextMarquee text="NeverAtHome" fontSize={18} />
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/calendar">Calendar</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/locations">Locations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
