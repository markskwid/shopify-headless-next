import { METAOBJECT_SCHEMA } from './../lib/schema/metaobjects';
import { z } from "zod";

export type METAOBECTS_TYPE = z.infer<typeof METAOBJECT_SCHEMA>;