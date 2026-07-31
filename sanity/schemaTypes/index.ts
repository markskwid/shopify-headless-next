import { type SchemaTypeDefinition } from "sanity";
import { internalLinkType } from "./objects/internalLink";
import { menuType } from "./documents/menu";
import { socialLinkType } from "./objects/socialLinks";
import { footerSettingsType } from "./documents/footerSettings";
import { headerSettingsType } from "./documents/headerSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [internalLinkType, menuType, socialLinkType, footerSettingsType, headerSettingsType],
};
