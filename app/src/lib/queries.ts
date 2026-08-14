import { portableTextFragment, thumbnailFragment } from "./fragments";
import { galleryFragment } from "./fragments";

export const siteQuery = `*[_type=="site"][0]{
  title,
  domain,
  description[]{
    _key,
    _type,
    value[]{
      ...,
      markDefs[]{
        ...,
        _type == "speaker" => {
          "speaker": ref->_id,
          "name": ref->name,
          "initials": ref->initials
        }
      }
    }
  },
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
  mediaarchiveLink,
  workshopSpaceFile{
    asset->{
      _id,
      url,
      originalFilename
    },
  },
  presskitLink{
    asset->{
      _id,
      url,
      originalFilename
    },
  },
  footerLogosFixed[]{
    asset->{
      _id,
      url,
    }
  },
  footerLogosInterchangeable[]{
    asset->{
      _id,
      url,
    }
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
    "dataType": "event",
    startDate,
    endDate,
    title,
    teaser,
    ticketLink,
    registrationMode,
    city,
    "colorPair": colorPair[0]->{_id, text, background},
    location,
    ${galleryFragment},
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
    link {
      ...,
      internalLink->{_type,slug,title}
    },
    headerLabel,
    "tag": tag->title,
    ${thumbnailFragment},
    imageIsSmall
  },
  features[]->{
    title,
    description,
    subtitle,
    headerLabel,
    link {
      ...,
      internalLink->{_type,slug,title}
    },
    links,
    "colorPair": colorPair[0]->{_id, text, background},
    "type": type->title,
    ${thumbnailFragment}
  }
}`;

export const contactQuery = `*[_type=="contact"][0]{
  bio,

  doubleFeature_team{
    text,
    image{
      "type": "image",
      "_id": asset->_id,
      "url": asset->url,
      "lqip": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "aspect_ratio": asset->metadata.dimensions.aspectRatio
    },
     "colorPair": colorPair->{
    _id,
    name,
    text,
    background
  },
  },

  doubleFeature_supporter{
    text,
    image{
      "type": "image",
      "_id": asset->_id,
      "url": asset->url,
      "lqip": asset->metadata.lqip,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "aspect_ratio": asset->metadata.dimensions.aspectRatio
    },
     "colorPair": colorPair->{
    _id,
    name,
    text,
    background
  },
  },

  teamMembers[]{
    name,
    role,
    email,
    phone,
    position
  },
  supportAccordions[]{
    "_id": _key,
    _key,
    _type,
    "dataType": "supportEntry",
    "type": columnOne,
    "yearLabel": columnTwo,
    "title": columnThree,
    "counterLabel": columnFour,
    info,
    ${galleryFragment},
  }
}`;

export const workshopsQuery = `*[_type=="workshops"][0]{
  description,
  facilities,
  subtext,
  features[]->{
    "colorPair": colorPair[0]->{_id, text, background},
    title,
    headerLabel,
      link {
      ...,
      internalLink->{_type,slug,title},
      externalLink
    },
    description,
    subtitle,
    links,
    "type": type->title,
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
    "tag": tag->title,
    ${thumbnailFragment},
    imageIsSmall
  },
  events[]->{
    _id,
    "type": type->title,
    "dataType": "event",
    startDate,
    endDate,
    title,
    teaser,
    ticketLink,
    registrationMode,
    city,
    "colorPair": colorPair[0]->{_id, text, background},
    location,
    ${galleryFragment},
    slug,
  },
}`;

export const studiosQuery = `*[_type=="studios"][0]{
  ${galleryFragment},
  description[]{${portableTextFragment}},
  events[]->{
    _id,
    "type": type->title,
    "dataType": "event",
    startDate,
    endDate,
    title,
    teaser,
    ticketLink,
    registrationMode,
    city,
    "colorPair": colorPair[0]->{_id, text, background},
    location,
    ${galleryFragment},
    slug,
  },
  studios[]->{
    title,
    description,
    "type": select(
      type == "sharedStudio" => "Shared Studio",
      type == "artistStudio" => "Artist Studio"
    ),
     "colorPair": colorPair[0]->{_id, text, background},
    ${thumbnailFragment}
  }
}`;

export const colorPairsQuery = `*[_type == "colorPair"]{
  name,
  text,
  background
}`;

export const artistQuery = `*[_type=="artist"]{
  _id,
  name,
  occupation,
  email,
  phone,
  website,
  socials[]{
    platform,
    link
  },
  "location": coalesce(location[0]->title, "Unknown location")
}`;

export const eventsQuery = `*[_type in ["programming","events"]][0]{
  ${galleryFragment},
  description[]{${portableTextFragment}},
  events[]->{
    _id,
    "type": type->title,
    "dataType": "event",
    startDate,
    endDate,
    title,
    ticketLink,
    registrationMode,
    "colorPair": colorPair[0]->{_id, text, background},
    city,
    location,
    ${galleryFragment},
    slug
  },
  selectedResidencies[]->{
    _id,
    "type": type->title,
    "dataType": "event",
    startDate,
    endDate,
    title,
    ticketLink,
    registrationMode,
    "colorPair": colorPair[0]->{_id, text, background},
    city,
    location,
    ${galleryFragment},
    slug
  },
  features[]->{
    title,
    description,
    subtitle,
    headerLabel,
    link {
      ...,
      internalLink->{_type,slug,title}
    },
    useHoverEffect,
    links,
    "colorPair": colorPair[0]->{_id, text, background},
    "type": type->title,
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
    "tag": tag->title,
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
  "dataType": "location",
  title,
  address,
  info,
  currentLocation,
  ${galleryFragment},
  moveInDate,
  "colorPair": colorPair[0]->{_id, text, background},
  slug,
  moveOutDate,
}`;

export const eventQuery = `*[_type=="event"]{
  _id,
  _type,
  "dataType": "event",
  title,
  pinned,
  "type": type->title,
  teaser,
  info,
  startDate,
  endDate,
  ticketLink,
  registrationMode,
  city,
  "colorPair": colorPair[0]->{_id, text, background},
  location,
  ${thumbnailFragment},
  ${galleryFragment},
  slug,
}`;

export const highlightQuery = `*[_type=="highlight"]{
  _id,
  title,
  startDate,
  endDate,
  description,
  subtitle,
  // links,
  link {
    ...,
    internalLink->{_type,slug,title}
  },
  headerLabel,
  "tag": tag->title,
  ${thumbnailFragment},
  imageIsSmall
}`;

export const featureQuery = `*[_type=="feature"]{
  title,
  description,
  subtitle,
  headerLabel,
  link {
    ...,
    internalLink->{_type,slug,title}
  },
  "colorPair": colorPair[0]->{_id, text, background},
  links,
  "type": type->title,
  ${thumbnailFragment}
}`;

export const newsletterQuery = `
*[_type == "newsletter"]{
  _id,
  title,
  "language": coalesce(language, "de"),
  release,
  subject,
  slug,

  pageBuilder[]{
    _key,
    _type,
    _type == "newsletterAnnouncement" => {
      sectionHeader,
      announcementText
    },
    _type == "newsletterDoubleFeature" => {
      sectionHeader,
      story[]{
        _key,
        featureTitle,
        link,
        runningText,
        "colorPair": colorPair->{_id, text, background},
        "image": {
          "url": image.asset->url,
          "dimensions": image.asset->metadata.dimensions,
          "lqip": image.asset->metadata.lqip
        }
      }
    },
    _type == "newsletterShowcase" => {
      title,
      date,
      "eventType": eventType->{
        _id,
        title
      },
      textTitle,
      text,
      "image": {
        "url": image.asset->url,
        "dimensions": image.asset->metadata.dimensions,
        "lqip": image.asset->metadata.lqip
      }
    },
    _type == "newsletterCalendar" => {
      sectionHeader,
      "events": event[]->{
        _id,
        title,
        teaser,
        startDate,
        endDate,
        city,
        location,
        ${thumbnailFragment},
        slug,
        "type": type->title
      },
    },
  }
}
`;
