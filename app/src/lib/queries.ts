import { thumbnailFragment } from "./fragments";

export const siteQuery = `*[_type=="site"][0]{
  title,
  description,
  address,
  googleMaps,
  email,
  about,
  socials[]{
    platform,
    link
  },
  colorPairs[]->{
    _id,
    text,
    background
  },
  supporters
}`;

export const homeQuery = `*[_type=="home"][0]{
  _id,
  images[]{
    "type": "image",
    "_id": asset->_id,
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "aspect_ratio": asset->metadata.dimensions.aspectRatio
  },
  events[]->{
    _id,
    "type": type->title,
    startDate,
    endDate,
    title,
    city,
    location,
    ${thumbnailFragment}
  },
  highlights[]->{
    _id,
    title,
    startDate,
    endDate,
    description,
    subtitle,
    links,
    "tag": select(
      tag == "inTheMedia" => "In The Media",
      tag == "visits" => "Visits",
      tag == "upcoming" => "Upcoming"
    ),
    ${thumbnailFragment}
  },
  features[]->{
    description,
    subtitle,
    links,
    "tag": select(
      tag == "location" => "The Location",
      tag == "visits" => "Visits"
    ),
    ${thumbnailFragment}
  }
}`;

export const contactQuery = `*[_type=="contact"][0]{
  bio,
  image{
    "type": "image",
    "_id": asset->_id,
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "aspect_ratio": asset->metadata.dimensions.aspectRatio
  },
  teamMembers[]{
    name,
    role,
    email,
    phone
  },
}`;

export const eventsQuery = `*[_type=="events"][0]{
  ${thumbnailFragment},
  description,
  events[]->{
    _id,
    "type": type->title,
    startDate,
    endDate,
    title,
    city,
    location,
    ${thumbnailFragment}
  },
  highlights[]->{
    _id,
    title,
    startDate,
    endDate,
    description,
    subtitle,
    links,
    "tag": select(
      tag == "inTheMedia" => "In The Media",
      tag == "visits" => "Visits",
      tag == "upcoming" => "Upcoming"
    ),
    ${thumbnailFragment}
  },
}`;

export const locationQuery = `*[_type=="location"]{
  _id,
  title,
  address,
  description,
  currentLocation,
  gallery[]{
    "type": select(defined(image) => "image", defined(video) => "video"),
    "_id": select(
      defined(image.asset) => image.asset->_id,
      defined(video.asset) => video.asset->_id,
      true => null
    ),
    "url": select(defined(image.asset) => image.asset->url, true => null),
    "lqip": select(defined(image.asset) => image.asset->metadata.lqip, true => null),
    "width": select(defined(image.asset) => image.asset->metadata.dimensions.width, true => null),
    "height": select(defined(image.asset) => image.asset->metadata.dimensions.height, true => null),
    "status": select(defined(video.asset) => video.asset->status, true => null),
    "assetId": select(defined(video.asset) => video.asset->assetId, true => null),
    "playbackId": select(defined(video.asset) => video.asset->playbackId, true => null),
    "aspect_ratio": select(
      defined(video.asset) => video.asset->data.aspect_ratio,
      defined(image) => null
    )
  },
  moveInDate,
  moveOutDate,
}`;

export const eventQuery = `*[_type=="event"]{
  _id,
  "type": type->title,
  startDate,
  endDate,
  title,
  city,
  location,
  ${thumbnailFragment},
  pinned
}`;

export const highlightQuery = `*[_type=="highlight"]{
  _id,
  title,
  startDate,
  endDate,
  description,
  subtitle,
  links,
  "tag": select(
    tag == "inTheMedia" => "In The Media",
    tag == "visits" => "Visits",
    tag == "upcoming" => "Upcoming"
  ),
  ${thumbnailFragment}
}`;

export const featureQuery = `*[_type=="feature"]{
  description,
  subtitle,
  links,
  "tag": select(
    tag == "location" => "The Location",
    tag == "visits" => "Visits",
  ),
  ${thumbnailFragment}
}`;
