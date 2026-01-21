import { forwardRef } from "react";

import ExpansionWrapper from "./AccordeonWrapper/ExpansionWrapper";
import NavigationWrapper from "./AccordeonWrapper/NavigationWrapper";

const AccordeonWrapper = forwardRef(
  ({ index, children, isExpanded, behavior, size, item, colorPair, handleExpand, invert }, ref) => {
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
    };

    switch (behavior) {
      case "expand":
        return <ExpansionWrapper {...props} />;
      case "navigate":
        return <NavigationWrapper {...props} />;
    }
  },
);

export default AccordeonWrapper;
