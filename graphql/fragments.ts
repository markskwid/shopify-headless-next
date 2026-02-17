//fragments for product fields
export const FRAGMENT_PRODUCT_FIELDS = `
    fragment ProductFields on Product{
      id
      title
      handle
      vendor
      totalInventory
      featuredImage{
        id
        width
        height
        url
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      description
    }
`;

//fragments for variant
