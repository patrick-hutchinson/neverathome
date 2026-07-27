import { forwardRef } from "react";

import ExpansionWrapper from "./AccordionWrapper/ExpansionWrapper";
import NavigationWrapper from "./AccordionWrapper/NavigationWrapper";

const AccordionWrapper = forwardRef(
  (
    {
      index,
      children,
      isExpanded,
      behavior,
      size,
      item,
      colorPair,
      handleExpand,
      invert,
      isExpandable,
    },
    ref,
  ) => {
    const props = {
      index,
      children,
      isExpanded,
      size,
      item,
      colorPair,
      handleExpand,
      invert,
      ref,
      isExpandable,
    };

    switch (behavior) {
      case "expand":
        return <ExpansionWrapper {...props} />;
      case "navigate":
        return <NavigationWrapper {...props} />;
    }
  },
);

export default AccordionWrapper;
