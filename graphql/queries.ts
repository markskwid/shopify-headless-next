import { FRAGMENT_PRODUCT_FIELDS, FRAGMENT_MENU_ITEMS } from "./fragments";

// fetch products for listing
export const FETCH_PRODUCTS = `
    ${FRAGMENT_PRODUCT_FIELDS}

    query FetchProducts {
    products(first: 15) {
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
    ${FRAGMENT_PRODUCT_FIELDS}
    query FetchProductByHandle($handle: String!) {
        product(handle: $handle) {
            ...ProductFields
            variants(first: 10) {
            nodes {
                id
                sku
                title
                availableForSale
                quantityAvailable
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