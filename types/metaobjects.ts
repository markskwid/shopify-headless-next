import { METAOBJECT_SCHEMA } from "./../lib/schema/metaobjects";
import { z } from "zod";

export type METAOBECTS_TYPE = z.infer<typeof METAOBJECT_SCHEMA>;

export type BANNER_TYPE = {
  id: string;
  handle: string;
  title: string | null;
  description: string | null;
  buttonTitle: string | null;
  buttonUrl: string | null;
  image: {
    url: string;
    width: number;
    height: number;
    altText: string | null;
  } | null;
};
