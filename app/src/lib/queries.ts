import { thumbnailFragment } from "./fragments";
import { galleryFragment } from "./fragments";

export const siteQuery = `*[_type=="site"][0]{
  title,
  description,
  address,
  openingHours,
  googleMaps,
  email,
  about,
  socials[]{
    platform,
    link
  },
  linktree[]{
    platform,
    link
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
    "colorPair": colorPair[0]->{_id, text, background},
    location,
    ${thumbnailFragment},
    slug,
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
    ${thumbnailFragment},
    imageIsSmall
  },
  features[]->{
    title,
    description,
    subtitle,
    links,
    "colorPair": colorPair[0]->{_id, text, background},
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

export const workshopsQuery = `*[_type=="workshops"][0]{
  description,
  facilities,
  subtext,
  features[]->{
    "colorPair": colorPair[0]->{_id, text, background},
    title,
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

export const studiosQuery = `*[_type=="studios"][0]{
  ${thumbnailFragment},
  description,
  studios[]->{
    title,
    description,
    "type": select(
      type == "sharedStudio" => "Shared Studio",
      type == "artistStudio" => "Artist Studio"
    ),
    ${thumbnailFragment}
  }
}`;

export const artistQuery = `*[_type=="artist"]{
  name,
  occupation,
  email,
  phone,
  "location": coalesce(location[0]->title, "Unknown location")
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
    "colorPair": colorPair[0]->{_id, text, background},
    city,
    location,
    ${thumbnailFragment},
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
    ${thumbnailFragment},
    imageIsSmall
  },
  residencies{
    text,
    ${thumbnailFragment}
  },
}`;

export const imprintQuery = `*[_type=="imprint"][0]{
  imprint,
}`;

export const locationQuery = `*[_type=="location"]{
  _id,
  title,
  address,
  description,
  currentLocation,
  ${galleryFragment},
  moveInDate,
  moveOutDate,
}`;

export const eventQuery = `*[_type=="event"]{
  _id,
  title,
  pinned,
  "type": type->title,
  info,
  startDate,
  endDate,
  ticketLink,
  city,
  "colorPair": colorPair[0]->{_id, text, background},
  location,
  ${thumbnailFragment},
  ${galleryFragment},
  report,
  slug,
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
  ${thumbnailFragment},
  imageIsSmall
}`;

export const featureQuery = `*[_type=="feature"]{
  title,
  description,
  subtitle,
  "colorPair": colorPair[0]->{_id, text, background},
  links,
  "tag": select(
    tag == "location" => "The Location",
    tag == "visits" => "Visits"
  ),
  ${thumbnailFragment}
}`;
