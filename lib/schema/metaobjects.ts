import { z } from "zod";

export const METAOBJECT_SCHEMA = z.object({
  fields: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .default([])
    .nullable(),
  handle: z.string(),
  id: z.string(),
});

export const METAOBJECT_RESPONSE_SCHEMA = z.object({
  metaobjects: z.object({
    nodes: z.array(METAOBJECT_SCHEMA).default([]),
  }),
});

export const BANNER_RESPONSE_SCHEMA = z.object({
  metaobjects: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        handle: z.string(),
        fields: z.array(
          z.object({
            key: z.string(),
            value: z.string().nullable(),
            reference: z
              .object({
                image: z.object({
                  url: z.string(),
                  width: z.number(),
                  height: z.number(),
                  altText: z.string().nullable(),
                }),
              })
              .nullable()
              .optional(),
          }),
        ),
      }),
    ),
  }),
});
