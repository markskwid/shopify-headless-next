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
