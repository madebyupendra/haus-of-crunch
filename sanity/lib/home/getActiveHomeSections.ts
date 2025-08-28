import { client } from "../client";
import { groq } from "next-sanity";

export const ACTIVE_HOME_SECTIONS_QUERY = groq`
  *[_type == "homeSection" && isActive == true] 
  | order(_createdAt asc)[0..1] {
    _id,
    title,
    image {
      asset->,
      hotspot,
      crop
    },
    buttonText,
    buttonLink
  }
`;

export async function getActiveHomeSections() {
  return client.fetch(ACTIVE_HOME_SECTIONS_QUERY);
}
