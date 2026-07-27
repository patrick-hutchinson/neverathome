"use client";

import TextMarquee from "../TextMarquee/TextMarquee";

import styles from "./Header.module.css";

import { useContext } from "react";
import { StateContext } from "@/context/StateContext";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

import AnimationLink from "../Animation/AnimationLink";

const Header = () => {
  const { isMobile } = useContext(StateContext);

  return (
    <header className={styles.header}>
      <AnimationLink path="/">
        <div className={styles.marquee}>
          <TextMarquee text="NeverAtHome" typo={18} />
        </div>
      </AnimationLink>

      {!isMobile ? <DesktopMenu /> : <MobileMenu />}
    </header>
  );
};

export default Header;
