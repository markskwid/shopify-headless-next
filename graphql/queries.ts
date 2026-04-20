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
    query FetchProductByHandle($handle: String!) {
        product(handle: $handle) {
            id
            title
            handle
            vendor
            totalInventory
            description
            images(first: 30){
             edges{
              node{
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
            featuredImage{
              id
              url
            }
            variants(first: 20) {
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

    query GET_COLLECTION_BY_HANDLE($handle: String!) {
    collection(handle: $handle) {
        title
        description
        handle
        image {
        altText
        url
        }
        products(first: 15) {
        nodes {
            ...ProductFields
        }
        }
    }
    }

`;

//get customer
export const GET_CUSTOMER_INFO = `
query GET_CUSTOMER($token: String!){
  customer(customerAccessToken: $token){
    id
    firstName
    lastName
    email
    acceptsMarketing
    phone
    createdAt
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
query PredictiveProductSearch($query: String!, $limit: Int = 10) {
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
