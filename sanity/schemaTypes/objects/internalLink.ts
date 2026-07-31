import { defineType, defineField } from "sanity";

export const internalLinkType = defineType({
  name: "internalLink",
  title: "Internal Link",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Link Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      initialValue: "custom",
      options: {
        list: [
          { title: "Shopify Product", value: "product" },
          { title: "Shopify Collection", value: "collection" },
          { title: "External Path", value: "custom" },
        ],
      },
    }),

    defineField({
      name: "productHandle",
      title: "Product Title",
      type: "string",
      description: "Example: white-jacket",
      hidden: ({ parent }) => parent?.linkType !== "product",
    }),

    defineField({
      name: "collectionHandle",
      title: "Collection Title",
      type: "string",
      description: "Example: featured-collection",
      hidden: ({ parent }) => parent?.linkType !== "collection",
    }),

    defineField({
      name: "customPath",
      title: "External Path",
      type: "string",
      description: "Example: /cart, /login, /sign-up",
      hidden: ({ parent }) => parent?.linkType !== "custom",
    }),
  ],

  preview: {
    select: {
      title: "title",
      linkType: "linkType",
      productHandle: "productHandle",
      collectionHandle: "collectionHandle",
      customPath: "customPath",
    },

    prepare({ title, linkType, productHandle, collectionHandle, customPath }) {
      const subtitle =
        linkType === "product"
          ? `/product/${productHandle ?? ""}`
          : linkType === "collection"
            ? `/collection/${collectionHandle ?? ""}`
            : customPath;

      return {
        title,
        subtitle,
      };
    },
  },
});
