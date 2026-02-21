"use client";

import ImageCompose from "./components/Image/ImageCompose";
import VideoCompose from "./components/Video/VideoCompose";

//ObjectFit belongs to image, use it and fall back to cover else.

const Media = ({ className, medium, objectFit }) => {
  if (!medium || (!medium.url && !medium.playbackId)) return undefined;

  switch (medium.type) {
    case "image":
      return <ImageCompose medium={medium} className={className} objectFit={objectFit} />;
    case "video":
      return <VideoCompose medium={medium} className={className} />;
    default:
      return null;
  }
};

Media.displayName = "Media";
export default Media;
