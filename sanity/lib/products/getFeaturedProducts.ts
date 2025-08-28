// sanity/lib/products/getFeaturedProducts.ts
import { client } from "../client";
import { groq } from "next-sanity";

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "featuredProducts" && isActive == true][0]{
    _id,
    title,
    products[]->{
      _id,
      name,
      price,
      slug,
      image {
        asset->,
        hotspot,
        crop
      }
    }
  }
`;


export async function getFeaturedProducts() {
  return client.fetch(FEATURED_PRODUCTS_QUERY);
}
