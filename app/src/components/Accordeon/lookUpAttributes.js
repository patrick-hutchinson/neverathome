export const lookUpAttributes = (item) => {
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
        meta: item?.currentLocation ? "Currently here!" : "Moved Out",
      };
  }
};
