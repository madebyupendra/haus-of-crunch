import { defineType, defineField } from "sanity";

export const homeSection = defineType({
  name: "homeSection",
  title: "Home Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
    }),
    defineField({
      name: "isActive",
      title: "Active?",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
