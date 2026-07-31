import { defineType, defineField } from "sanity";

export const headerSettingsType = defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  fields: [
    defineField({
      name: "mainMenu",
      title: "Main Menu",
      type: "reference",
      to: [{ type: "menu" }],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Header Settings",
      };
    },
  },
});
