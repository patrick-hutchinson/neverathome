import { useAnimatedNavigation } from "./hooks/useAnimatedNavigation";

const AnimationLink = ({ path, link, children, className }) => {
  const navigate = useAnimatedNavigation();

  const resolveHref = (value) => {
    if (!value) return null;

    const internalSlug = value.internalLink?.slug?.current || value.internal?.slug?.current || value.reference?.slug?.current;
    const externalHref = value.url || value.href || value.externalLink || value.external;

    if (value.type === "internal") return internalSlug ? `/${internalSlug}` : null;
    if (value.type === "email") return value.email ? `mailto:${value.email}` : null;
    if (value.type === "external") return externalHref || null;

    // Fallback for mixed/legacy mark shapes.
    if (internalSlug) return `/${internalSlug}`;
    if (externalHref) return externalHref;

    return null;
  };

  let href;
  if (link) {
    href = resolveHref(link);
  } else {
    href = path;
  }

  if (!href) return <>{children}</>;

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const isExternal = !isInternal;

  const handleClick = (e) => {
    if (!isInternal) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

export default AnimationLink;
