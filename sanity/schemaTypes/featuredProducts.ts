// sanity/schemaTypes/featuredProducts.ts
import { defineType, defineField } from "sanity";

export const featuredProducts = defineType({
  name: "featuredProducts",
  title: "Featured Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Featured Products",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "isActive",
      title: "Active?",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
