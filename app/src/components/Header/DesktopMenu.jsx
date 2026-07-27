"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import AnimationLink from "../Animation/AnimationLink";

import styles from "./Header.module.css";
import { useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";

const DesktopMenu = () => {
  const pathname = usePathname();
  const router = useTransitionRouter();

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
            <AnimationLink path="/about" className={isActive("/about") ? styles.active : undefined}>
              About
            </AnimationLink>
          </ul>
        </li>

        <li>
          <ul className={styles.nav_section}>
            <li>
              <AnimationLink path="/studios" className={isActive("/studios") ? styles.active : undefined}>
                Studios
              </AnimationLink>
              <span>{", "}</span>
            </li>

            <li>
              <AnimationLink path="/workshops" className={isActive("/workshops") ? styles.active : undefined}>
                Workshops
              </AnimationLink>
              <span>{", "}</span>
            </li>

            <li>
              <AnimationLink path="/program" className={isActive("/program") ? styles.active : undefined}>
                Program
              </AnimationLink>
            </li>
          </ul>
        </li>

        <ul style={{ gap: "30px" }}>
          <li>
            <AnimationLink path="/artists" className={isActive("/artists") ? styles.active : undefined}>
              Artists
            </AnimationLink>
          </li>

          <li style={{ cursor: "pointer" }}>
            <AnimationLink path="/calendar" className={isActive("/calendar") ? styles.active : undefined}>
              Calendar
            </AnimationLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default DesktopMenu;
