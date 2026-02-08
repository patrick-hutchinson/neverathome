// utils/resolveLink.ts
export function resolveLink(link) {
  if (!link) return null;

  switch (link.type) {
    case "internal":
      return {
        type: "internal",
        path: "/" + link.internal?.slug?.current,
      };

    case "external":
      return {
        type: "external",
        href: link.external,
      };

    case "email":
      return {
        type: "email",
        href: `mailto:${link.email}`,
      };

    default:
      return null;
  }
}
