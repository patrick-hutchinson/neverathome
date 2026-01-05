import { forwardRef } from "react";

const AccordeonItem = forwardRef(({ index, children }, ref) => {
  return (
    <div ref={ref} data-index={index}>
      {children}
    </div>
  );
});

export default AccordeonItem;
