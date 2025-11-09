import Link from "next/link";

import styles from "./Header.module.css";

const DesktopMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <ul className={styles.nav_section}>
            <Link href="/about">About</Link>
          </ul>
        </li>

        <li>
          <ul className={styles.nav_section}>
            <li className={styles.not_allowed}>
              <Link href="/studios">Studios</Link>
              <span>{", "}</span>
            </li>

            <li className={styles.not_allowed}>
              <Link href="/workshops">Workshops</Link>
              <span>{", "}</span>
            </li>

            <li className={styles.not_allowed}>
              <Link href="/programming">Programming</Link>
            </li>
          </ul>
        </li>

        <ul style={{ gap: "30px" }}>
          <li className={styles.not_allowed}>
            <Link href="/artists">Artists</Link>
          </li>
          <li className={styles.not_allowed}>
            <Link href="/locations">Locations</Link>
          </li>
          <li style={{ cursor: "pointer" }}>
            <Link href="/calendar">Calendar</Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
