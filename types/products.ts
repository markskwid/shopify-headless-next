export interface PRODUCT_LISTING {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  totalInventory?: number;
  featuredImage?: {
    id: string;
    url: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currenyCode: string;
    };

    maxVariantPrice: {
      amount: string;
      currenyCode: string;
    };
  };

  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currenyCode: string;
    };

    maxVariantPrice: {
      amount: string;
      currenyCode: string;
    };
  };

  description?: string;
}

export interface PRODUCT_VARIANTS {
  id: string;
  sku?: string;
  title: string;
  availableForSale?: boolean;
  quantityAvailable?: number;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
  image?: {
    url: string;
  };
  price: {
    currencyCode: string;
    amount: string;
  };
}

export interface PRODUCT_BY_HANDLE extends PRODUCT_LISTING {
  variants?: PRODUCT_VARIANTS[];
}
