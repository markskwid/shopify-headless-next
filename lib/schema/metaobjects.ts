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

export const SOCIAL_MEDIA_RESPONSE_SCHEMA = z.object({
  metaobjects: z.object({
    nodes: z.array(METAOBJECT_SCHEMA).default([]).nullable(),
  }),
});
