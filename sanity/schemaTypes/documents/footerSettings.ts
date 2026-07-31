import { defineType, defineField } from "sanity";

export const footerSettingsType = defineType({
  name: "footerSettingsType",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "columns",
      title: "Footer Menu Columns",
      type: "array",
      of: [
        {
          name: "footerMenuColumn",
          title: "Footer Menu Column",
          type: "object",
          fields: [
            defineField({
              name: "columnTitle",
              title: "Column Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "menu",
              title: "Menu",
              type: "reference",
              to: [{ type: "menu" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLinkType" }],
    }),

    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Example: 2026 Store Name. All rights reseved.",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Footer Settings",
      };
    },
  },
});
