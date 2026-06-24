import { z } from "zod";

export const ADDRESS_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  company: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  country: z.string().nullable(),
  zip: z.string().nullable(),
  phone: z.string().nullable(),
});

