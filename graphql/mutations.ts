import { FRAGMENT_CART_ITEM } from "./fragments";

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
      code
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
      code
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
mutation CREATE_CART($input: CartInput){
  cartCreate(input: $input){
    cart{
      id
      totalQuantity
      checkoutUrl

      buyerIdentity {
          email
          customer {
            firstName
            lastName
          }
       }
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

export const CART_LINES_ADD = `
${FRAGMENT_CART_ITEM}
mutation ADD_TO_CART($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CART_FIELD
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

export const CART_LINES_REMOVE = `
${FRAGMENT_CART_ITEM}
mutation REMOVE_ITEM($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart{
      ...CART_FIELD
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
}
`;

export const CART_LINES_UPDATE = `
${FRAGMENT_CART_ITEM}
mutation UPDATE_ITEM($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CART_FIELD
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

export const CART_UPDATE_NOTE = `
${FRAGMENT_CART_ITEM}
mutation UPDATE_CART_NOTE($cartId: ID!, $note: String!) {
  cartNoteUpdate(cartId: $cartId, note: $note) {
    cart {
      ...CART_FIELD
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

//----- Attach customer info on the current cart
export const CART_ATTACH_BUYER_IDENTITY = `
  mutation cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        buyerIdentity {
          email
          customer {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

//----- Apply discount code
export const CART_APPLY_DISCOUNT_CODE = `
mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
    cart {
      discountCodes {
        code
        applicable
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

//----- Edit customer address
export const CUSTOMER_EDIT_ADDRESS = `
 mutation customerAddressUpdate(
  $customerAccessToken: String!
  $id: ID!
  $address: MailingAddressInput!
) {
  customerAddressUpdate(
    customerAccessToken: $customerAccessToken
    id: $id
    address: $address
  ) {
    customerAddress {
      id
      firstName
      lastName
      company
      address1
      address2
      city
      province
      country
      zip
      phone
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}`;

//----- Add customer address
export const CUSTOMER_CREATE_ADDRESS = `
 mutation customerAddressCreate(
  $customerAccessToken: String!
  $address: MailingAddressInput!
) {
  customerAddressCreate(
    customerAccessToken: $customerAccessToken
    address: $address
  ) {
    customerAddress {
      id
      firstName
      lastName
      company
      address1
      address2
      city
      province
      country
      zip
      phone
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}`;

//----- Set Default customer address
export const CUSTOMER_SET_DEFAULT_ADDRESS = `
mutation customerDefaultAddressUpdate(
  $customerAccessToken: String!
  $addressId: ID!
) {
  customerDefaultAddressUpdate(
    customerAccessToken: $customerAccessToken
    addressId: $addressId
  ) {
    customer {
      id
      defaultAddress {
        id
      }
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}`;