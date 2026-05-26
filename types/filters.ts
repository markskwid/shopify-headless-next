import { FILTER_SCHEMA } from './../lib/schema/filters';
import { z } from "zod";


export type FILTER_TYPE = z.infer<typeof FILTER_SCHEMA>;