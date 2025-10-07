import Media from "./Media";

const CoverMedia = ({ medium }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "calc(100vh - var(--header-height))",
        left: "calc(-1 * var(--margin))",
      }}
    >
      <Media medium={medium} />
    </div>
  );
};

export default CoverMedia;
