// types/navigation.ts

import { SOCIAL_LINKS_TYPE } from "./social";

export type InternalLinkItem = {
  _key: string;
  _type: "internalLink";
  title: string;
  linkType: "cmsPage" | "product" | "collection" | "custom";
  page?: {
    title?: string;
    slug?: string;
  };
  productHandle?: string;
  collectionHandle?: string;
  customPath?: string;
};

export type ExternalLinkItem = {
  _key: string;
  _type: "externalLink";
  title: string;
  url: string;
  openInNewTab?: boolean;
};

export type DropdownLinkItem = {
  _key: string;
  _type: "dropdownLink";
  title: string;
  featuredImage?: unknown;
  featuredHeading?: string;
  featuredText?: string;
  items?: Array<InternalLinkItem | ExternalLinkItem>;
};

export type NavigationItem =
  InternalLinkItem | ExternalLinkItem | DropdownLinkItem;

export type SanityMenu = {
  title?: string;
  slug?: string;
  items?: NavigationItem[];
};

export type FOOTER_SETTINGS_TYPE = {
  columns: FOOTER_COLUMN_TYPE;
  socialLinks: SOCIAL_LINKS_TYPE;
};

export type FOOTER_COLUMN_TYPE = {
  _key: string;
  title: string;
  menu?: SanityMenu;
};


// export type NavigationData = {
//   header?: {
//     mainMenu?: SanityMenu;
//     mobileMenu?: SanityMenu;
//   };
//   footer?: {
//     newsletterTitle?: string;
//     newsletterText?: string;
//     columns?: FooterColumn[];
//     socialLinks?: SocialLink[];
//     copyrightText?: string;
//   };
// };
