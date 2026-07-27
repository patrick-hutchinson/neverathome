import Media from "./Media/Media";
import Slideshow from "./Slideshow/Slideshow";

const CoverMedia = ({ medium, media }) => {
  if (!medium && !media) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "calc(100vh - var(--header-height))",
        left: "calc(-1 * var(--margin))",
        position: "sticky",
        top: "var(--header-height)",
      }}
    >
      {medium && <Media medium={medium} />}
      {media && <Slideshow media={media} />}
    </div>
  );
};

export default CoverMedia;
