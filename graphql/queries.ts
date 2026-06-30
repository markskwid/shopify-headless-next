
import {
  FRAGMENT_PRODUCT_FIELDS,
  FRAGMENT_MENU_ITEMS,
  FRAGMENT_CART_ITEM,
} from "./fragments";

// fetch products for listing
export const FETCH_PRODUCTS = `
    ${FRAGMENT_PRODUCT_FIELDS}

    query FetchProducts($sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: 12, sortKey: $sortKey, reverse: $reverse) {
        edges {
        node {
            ...ProductFields
        }
        }
        pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        }
    }
    }
`;

// fetch product -- by handle (pdp)
export const FETCH_PRODUCT_BY_HANDLE = `
    query FetchProductByHandle($handle: String!, $imagesFirst: Int!, $variantsFirst: Int!) {
        product(handle: $handle) {
            id
            title
            handle
            vendor
            totalInventory
            description

            seo {
              title
              description
            }

            images(first: $imagesFirst) {
              edges {
                node {
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

            featuredImage {
              id
              url
            }

            variants(first: $variantsFirst) {
              nodes {
                id
                sku
                title
                availableForSale
                quantityAvailable
                currentlyNotInStock
                selectedOptions {
                  name
                  value
                }
                image {
                  id
                  url
                }
                price {
                  currencyCode
                  amount
                }
              }
            }
        }
    }
`;
// fetch related products

export const GET_PRODUCT_RECOMMENDATION = `
  ${FRAGMENT_PRODUCT_FIELDS}

  query GET_PRODUCT_RECOMMENDATION($productHandle: String!){
    productRecommendations(productHandle: $productHandle){
      ...ProductFields
    }
  }
`;

//get navigation menu by handle
export const GET_MENU_BY_HANDLE = `
    ${FRAGMENT_MENU_ITEMS}

    query GET_MENUS($handle: String!) {
    menu(handle: $handle) {
        id
        handle
        title
        itemsCount
        items {
        ...MENU_ITEM_FIELDS
        }
    }
    }
`;

//get collections
export const FETCH_COLLECTIONS = `
    query GET_COLLECTIONS {
        collections(first: 10) {
            edges {
            node {
                title
                description
                handle
                image {
                altText
                url
                }
            }
            }
            pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            }
        }
    }
`;

/**
 * get social medias
 * this require a metaobject type social_media
 * field
 * -Platform
 * -URL
 */

export const FETCH_HOMEPAGE_BANNER = `
query HomepageBanner {
  metaobjects(type: "homepage_banner", first: 10) {
    nodes {
      id
      handle
      fields {
        key
        value
      }
    }
  }
}`;

/**
 * get social medias
 * this require a metaobject type social_media
 * field
 * -Platform
 * -URL
 */

export const FETCH_SOCIAL_MEDIA = `
query SocialMedia {
  metaobjects(type: "social_media", first: 10) {
    nodes {
      id
      handle
      fields {
        key
        value
      }
    }
  }
}`;

/**
 * get featured collection
 * this require a metaobject type featured-collection
 * field name must be Collections and type is list of collections
 */

export const FETCH_FEATURED_COLLECTIONS = `
query FeaturedCollections {
  metaobjects(type: "featured_collection", first: 1) {
    nodes {
      id
      handle
      fields {
        key
        references(first: 10) {
          nodes {
            ... on Collection {
              id
              title
              description
              handle
              image {
                url
              }
            }
          }
        }
      }
    }
  }
}`;

//get collection by handle
export const FETCH_COLLECTION_BY_HANDLE = `
${FRAGMENT_PRODUCT_FIELDS}
query GET_COLLECTION_BY_HANDLE($handle: String!, $filters: [ProductFilter!], $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
        title
        description
        handle
        image {
            altText
            url
        }
        products(first: 15, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
            nodes {
                ...ProductFields
            }
        }
    }
}`;

//get customer
export const GET_CUSTOMER_INFO = `
query GET_CUSTOMER($token: String!) {
  customer(customerAccessToken: $token) {
    id
    firstName
    lastName
    email
    acceptsMarketing
    phone

    defaultAddress {
      id
      firstName
      lastName
      address1
      address2
      company
      city
      province
      country
      zip
      phone
    }

    addresses(first: 10) {
      nodes {
        id
        firstName
        lastName
        address1
        address2
        city
        province
        country
        company
        zip
        phone
      }
    }

    orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
      nodes {
        id
        orderNumber
        processedAt
        financialStatus
        fulfillmentStatus
        subtotalPrice {
          amount
          currencyCode
        }
        totalShippingPrice {
          amount
          currencyCode
        }
        totalTax {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        currentTotalPrice {
          amount
          currencyCode
        }
        totalRefunded {
          amount
          currencyCode
        }

        discountApplications(first: 5) {
          nodes {
            ... on DiscountCodeApplication {
              code
              applicable
              value {
                ... on PricingPercentageValue {
                  percentage
                }
                ... on MoneyV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
          
        lineItems(first: 10) {
          nodes {
            title
            quantity
            variant {
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;

//get user cart
export const GET_CART = `
${FRAGMENT_CART_ITEM}
 query GET_CART($cartId: ID!) {
  cart(id: $cartId) {
     ...CART_FIELD
  }
}`;

//predictive search result
export const PREDICTIVE_SEARCH = `
query PredictiveProductSearch($query: String!, $limit: Int = 5) {
  predictiveSearch(
    query: $query
    limit: $limit
    types: [PRODUCT]
  ) {
    products {
      id
      title
      handle
      featuredImage {
        id
        url
        altText
      }

      availableForSale
    }
  }
}`;

//for search page
export const SEARCH_PRODUCTS = `
${FRAGMENT_PRODUCT_FIELDS}

query SEARCH_PRODUCTS($query: String!, $first: Int = 10, $sortKey: SearchSortKeys, $reverse: Boolean) {
  search(
    query: $query,
    first: $first,
    types: [PRODUCT],
    sortKey: $sortKey,
    reverse: $reverse
  ) {
    totalCount
   
    edges{
     node{
      ...on Product{
         ...ProductFields
       }
     }
    }
    pageInfo{
     hasNextPage
     endCursor
    }
  }
}`;

//get collection filters
export const GET_COLLECTION_FILTER = `
  query GET_COLLECTION_FILTER($handle: String!){
     collection(handle: $handle){
      products(first: 1){
        filters{
          id
          label
          type
          values{
            id
            label
            input
            count
          }
        }
      } 
    }  
  }
`;
