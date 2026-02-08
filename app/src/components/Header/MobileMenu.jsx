import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import AnimationLink from "../Animation/AnimationLink";

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

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="menu"
            className={styles.menu}
          >
            <ul typo="h1" className={styles.mobileMenu}>
              <li>
                <AnimationLink path="/about" className={isActive("/about") ? styles.active : undefined}>
                  About
                </AnimationLink>
              </li>

              <li>
                <AnimationLink path="/studios" className={isActive("/studios") ? styles.active : undefined}>
                  Studios
                </AnimationLink>
              </li>

              <li>
                <AnimationLink path="/workshops" className={isActive("/workshops") ? styles.active : undefined}>
                  Workshops
                </AnimationLink>
              </li>

              <li>
                <AnimationLink path="/programming" className={isActive("/programming") ? styles.active : undefined}>
                  Programming
                </AnimationLink>
              </li>

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
