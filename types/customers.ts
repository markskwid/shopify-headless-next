export interface CUSTOMER_CREATE {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CUSTOMER_TOKEN {
  accessToken: string;
  expiresAt: string;
}

export interface CUSTOMER_INFO extends Omit<CUSTOMER_CREATE, "password"> {
  id?: string;
  acceptsMarketing?: boolean;
  phone?: string;
}
