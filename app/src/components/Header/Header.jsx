"use client";

import { usePathname } from "next/navigation";
import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";
import Link from "next/link";
import { useContext } from "react";
import { StateContext } from "@/context/StateContext";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const pathname = usePathname();

  const { isMobile } = useContext(StateContext);

  return (
    <header className={styles.header}>
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.marquee}>
          <TextMarquee text="NeverAtHome" typo={18} />
        </div>
      </Link>

      {!isMobile ? <DesktopMenu /> : <MobileMenu />}
    </header>
  );
};

export default Header;
