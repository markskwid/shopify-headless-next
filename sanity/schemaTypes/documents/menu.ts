import { defineType, defineField } from "sanity";

export const menuType = defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Menu Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [{ type: "internalLink" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items = [] }) {
      return {
        title,
        subtitle: `${items.length} item(s)`,
      };
    },
  },
});
