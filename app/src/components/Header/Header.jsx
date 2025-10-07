"use client";

import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.marquee}>
          <TextMarquee text="NeverAtHome" fontSize={18} />
        </div>
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <ul className={styles.nav_section}>
              <Link href="/about">About</Link>
            </ul>
          </li>

          <li>
            <ul className={styles.nav_section}>
              <li>
                <Link href="/studios">Studios</Link>
                <span>{", "}</span>
              </li>

              <li>
                <Link href="/workshops">Workshops</Link>
                <span>{", "}</span>
              </li>

              <li>
                <Link href="/events">Events</Link>
              </li>
            </ul>
          </li>

          <ul style={{ gap: "30px" }}>
            <li>
              <Link href="/artists">Artists</Link>
            </li>
            <li>
              <Link href="/locations">Locations</Link>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
