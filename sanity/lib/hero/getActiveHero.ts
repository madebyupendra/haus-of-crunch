// sanity/lib/hero/getActiveHero.ts
import { client } from "../client"; // adjust path if needed
import { groq } from "next-sanity";
import { ACTIVE_HERO_QUERYResult } from "@/sanity.types";

export const ACTIVE_HERO_QUERY = groq`
  *[_type == "hero" && isActive == true] | order(_createdAt desc)[0] {
    _id,
    _type,
    title,
    subtitle,
    backgroundImage {
      asset->,
      hotspot,
      crop,
      _type
    },
    buttonText,
    buttonLink,
    isActive
  }
`;

export async function getActiveHero(): Promise<ACTIVE_HERO_QUERYResult> {
  return client.fetch(ACTIVE_HERO_QUERY);
}
