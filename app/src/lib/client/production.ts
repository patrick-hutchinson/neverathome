import { createClient } from "@sanity/client";

export const production = createClient({
  projectId: "503pb0j3",
  dataset: "production",
  apiVersion: "2025-09-23", // today’s date or the version you want
  useCdn: false, // set to false if you want fresh data
});
