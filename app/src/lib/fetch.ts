import { client } from "./client";
import { siteQuery, eventQuery, highlightQuery, homeQuery, featureQuery, contactQuery, locationQuery } from "./queries";

export async function getSiteData() {
  return client.fetch(siteQuery);
}

export async function getHome() {
  return client.fetch(homeQuery);
}

export async function getContact() {
  return client.fetch(contactQuery);
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
