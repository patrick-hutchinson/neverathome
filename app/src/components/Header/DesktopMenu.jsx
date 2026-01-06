"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import styles from "./Header.module.css";
import { useEffect } from "react";

const DesktopMenu = () => {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {});
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <ul className={styles.nav_section}>
            <Link href="/about" className={isActive("/about") ? styles.active : undefined}>
              About
            </Link>
          </ul>
        </li>

        <li>
          <ul className={styles.nav_section}>
            <li>
              <Link href="/studios" className={isActive("/studios") ? styles.active : undefined}>
                Studios
              </Link>
              <span>{", "}</span>
            </li>

            <li>
              <Link href="/workshops" className={isActive("/workshops") ? styles.active : undefined}>
                Workshops
              </Link>
              <span>{", "}</span>
            </li>

            <li>
              <Link href="/programming" className={isActive("/programming") ? styles.active : undefined}>
                Programming
              </Link>
            </li>
          </ul>
        </li>

        <ul style={{ gap: "30px" }}>
          <li>
            <Link href="/artists" className={isActive("/artists") ? styles.active : undefined}>
              Artists
            </Link>
          </li>

          <li style={{ cursor: "pointer" }}>
            <Link href="/calendar" className={isActive("/calendar") ? styles.active : undefined}>
              Calendar
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
