"use client";

import Text from "@/components/Text";

const ImprintPage = ({ imprint }) => {
  return (
    <main>
      <Text text={imprint.imprint} className="ff4" />
    </main>
  );
};

export default ImprintPage;
