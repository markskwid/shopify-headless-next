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

//fragments for menu items
export const FRAGMENT_MENU_ITEMS = `
    fragment MENU_ITEM_FIELDS on MenuItem {
    id
    title
    url
    items {
        id
        url
        title
    }
    }
`;
