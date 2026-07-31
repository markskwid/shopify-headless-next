import { defineField, defineType } from "sanity";

export const socialLinkType = defineType({
  name: "socialLinkType",
  title: "Social Links",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "X", value: "x" },
          { title: "Tiktok", value: "tiktok" },
          { title: "Pinterest", value: "pinterest" },
          { title: "YouTube", value: "youtube" },
          { title: "LinkedIn", value: "linkedin" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "url",
      title: "Platform URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],

  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
  },
});
