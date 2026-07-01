import { BANNER_TYPE } from "@/types/metaobjects";

export const normalizeBannerFields = (
  fields: {
    key: string;
    value: string | null;
    reference?: { image: BANNER_TYPE["image"] } | null;
  }[],
): Omit<BANNER_TYPE, "id" | "handle"> => {
  // convert array to key-map once, then pull exactly what you need
  const map = Object.fromEntries(fields.map((f) => [f.key, f]));

  return {
    title: map["banner_title"]?.value ?? null,
    description: map["banner_description"]?.value ?? null,
    buttonTitle: map["button_title"]?.value ?? null,
    buttonUrl: map["button_url"]?.value ?? null,
    image: map["banner_image"]?.reference?.image ?? null,
  };
};
