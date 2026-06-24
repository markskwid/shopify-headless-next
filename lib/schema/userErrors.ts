import { z } from "zod";

export const USER_ERROR_SCHEMA = z
  .array(
    z.object({
      field: z.array(z.string()).optional(),
      message: z.string(),
      code: z.string(),
    }),
  )
  .nullable()
  .optional();
