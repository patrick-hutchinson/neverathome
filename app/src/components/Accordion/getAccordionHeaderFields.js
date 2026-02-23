export const getAccordionHeaderFields = (item) => {
  if (!item) return { title: "", date: "", meta: "" };

  switch (item.dataType) {
    case "event":
      return {
        title: item?.title,
        date: item?.startDate,
        meta: item?.type,
      };
    case "location":
      return {
        title: item?.title,
        date: item?.moveInDate,
        meta: item?.currentLocation ? "Currently at" : "Moved Out",
      };
    case "supportEntry":
      return {
        title: item?.title,
        date: item?.yearLabel,
        meta: item?.type,
      };
    default:
      return {
        title: item?.title || "",
        date: item?.startDate || "",
        meta: item?.type || "",
      };
  }
};
