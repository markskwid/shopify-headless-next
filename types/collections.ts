import { PRODUCT_LISTING } from "./products";

export interface COLLECTION_LISTING {
  title: string;
  description: string;
  handle: string;
  image?: {
    altText: string;
    url: string;
  };
}

export interface COLLECTION_BY_HANDLE extends COLLECTION_LISTING {
  products?: PRODUCT_LISTING[];
}
