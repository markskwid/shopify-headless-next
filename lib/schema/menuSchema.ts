import { MENU_TYPE } from "@/types/menuTypes";
import z from "zod";

export const MENU_SCHEMA: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    url: z.string(),
    items: z.array(MENU_SCHEMA).optional().nullable(),
  }),
);

export const MENU_RESPONSE_SCHEMA = z.object({
  menu: z
    .object({
      id: z.string(),
      handle: z.string(),
      title: z.string(),
      itemsCount: z.number(),
      items: z.array(MENU_SCHEMA),
    })
    .nullable(),
});
