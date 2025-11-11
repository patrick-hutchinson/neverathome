import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Link from "next/link";
import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

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
                <Link href="/about">About</Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/studios">Studios</Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/workshops">Workshops</Link>
              </li>

              <li className={styles.not_allowed}>
                <Link href="/programming">Program</Link>
              </li>

              <li>
                <Link href="/artists">Artists</Link>
              </li>
              <li className={styles.not_allowed}>
                <Link href="/locations">Locations</Link>
              </li>
              <li style={{ cursor: "pointer" }}>
                <Link href="/calendar">Calendar</Link>
              </li>
            </ul>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};

export default MobileMenu;
