import { production } from "./client/production";
import { preview } from "./client/preview";

const isProduction = process.env.VERCEL_ENV === "production";
const isPreview = process.env.VERCEL_ENV === "preview";
const isLocal = !process.env.VERCEL_ENV;

export const getSanityClient = () => {
  if (isProduction) return production;
  if (isPreview || isLocal) return preview;
};

const client = getSanityClient();

console.log("client:", client.config());

import {
  siteQuery,
  eventQuery,
  highlightQuery,
  homeQuery,
  featureQuery,
  contactQuery,
  locationQuery,
  eventsQuery,
  artistQuery,
  workshopsQuery,
  studiosQuery,
  imprintQuery,
  colorPairsQuery,
} from "./queries";

export async function getColorPairs() {
  return client.fetch(colorPairsQuery);
}

export async function getSiteData() {
  return client.fetch(siteQuery);
}

export async function getHome() {
  return client.fetch(homeQuery);
}

export async function getContact() {
  return client.fetch(contactQuery);
}

export async function getWorkshopsPage() {
  return client.fetch(workshopsQuery);
}

export async function getStudiosPage() {
  return client.fetch(studiosQuery);
}

export async function getArtists() {
  return client.fetch(artistQuery);
}

export async function getEventsPage() {
  return client.fetch(eventsQuery);
}

export async function getImprintPage() {
  return client.fetch(imprintQuery);
}

export async function getLocations() {
  return client.fetch(locationQuery);
}

export async function getEvents() {
  return client.fetch(eventQuery);
}

export async function getHighlights() {
  return client.fetch(highlightQuery);
}

export async function getFeatures() {
  return client.fetch(featureQuery);
}
