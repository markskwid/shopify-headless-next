import { PRODUCT_LISTING_TYPE } from "./product";

export type SEARCH_RESULT_PAGE_TYPE = {
  totalCount: number;
  products: PRODUCT_LISTING_TYPE[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};
