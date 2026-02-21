import { MENU_SCHEMA } from "./../lib/schema/menuSchema";
import { z } from "zod";

export type MENU_TYPE = z.infer<typeof MENU_SCHEMA>;
