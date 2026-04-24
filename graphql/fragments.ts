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

      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          currentlyNotInStock
          image {
            id
            url
            altText
          }
        }
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

export const FRAGMENT_CART_ITEM = `
fragment CART_FIELD on Cart {
  id
  note
  totalQuantity
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
   }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 10) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          sku
          title
          product{
            title
          }
          image{
           url
           altText
          }
          price {
            amount
            currencyCode
          }
          selectedOptions {
            value
            name
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;
