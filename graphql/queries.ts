import { FRAGMENT_PRODUCT_FIELDS } from "./fragments";

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
