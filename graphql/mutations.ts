//mutation create customer

//**
// =================================
/**
 * current input fields firstname, lastname, email, and password.
 */
//===================================
//
export const CREATE_CUSTOMER = `
mutation CUSTOMER_CREATE($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
      firstName
      lastName
      email
    }
    customerUserErrors {
      field
      message
    }
  }
}
`;

//mutation customer login
export const CUSTOMER_LOGIN = `
mutation CUSTOMER_LOGIN($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      field
      message
    }
  }
}
`;

//**
// =================================
/**
 * cart mutations
 */
//===================================
//

export const CREATE_CART = `
mutation createCart($input: CartInput){
  cartCreate(input: $input){
    cart{
      id
      totalQuantity
      checkoutUrl
    }
    
    userErrors{
      field
      message
    }
    
    warnings{
      message
      code
    }
  }
}`;

export const ADD_TO_CART = `
mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          merchandise {
            ...on ProductVariant {
              id
              title
              image {
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
          quantity
        }
      }
      totalQuantity
    }
    userErrors {
      field
      message
    }
    warnings {
      code
      message
    }
  }
}`;
