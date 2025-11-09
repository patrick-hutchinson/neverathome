"use client";

import Text from "@/components/Text";

import styles from "./ImprintPage.module.css";

const ImprintPage = ({ imprint }) => {
  return (
    <main className={styles.main}>
      <Text className={`${styles.imprint}`} text={imprint.imprint} typo="h4" />
    </main>
  );
};

export default ImprintPage;
