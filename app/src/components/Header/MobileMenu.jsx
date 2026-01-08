import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";
import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.menuButton} onClick={() => setShowMenu((prev) => !prev)}>
        {showMenu ? "Close" : "Menu"}
      </div>
      {showMenu && (
        <AnimatePresence>
          <div key="menu" className={styles.menu} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <ul className={styles.mobileMenu} typo="h1">
              <li>
                <Link href="/about" className={isActive("/about") ? styles.active : undefined}>
                  About
                </Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/studios" className={isActive("/studios") ? styles.active : undefined}>
                  Studios
                </Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/workshops" className={isActive("/workshops") ? styles.active : undefined}>
                  Workshops
                </Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/programming" className={isActive("/programming") ? styles.active : undefined}>
                  Program
                </Link>
              </li>

              <li>
                <Link href="/artists" className={isActive("/artists") ? styles.active : undefined}>
                  Artists
                </Link>
              </li>
              <li className={styles.not_allowed}>
                <Link href="/locations" className={isActive("/locations") ? styles.active : undefined}>
                  Locations
                </Link>
              </li>
              <li style={{ cursor: "pointer" }}>
                <Link href="/calendar" className={isActive("/calendar") ? styles.active : undefined}>
                  Calendar
                </Link>
              </li>
            </ul>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};

export default MobileMenu;
