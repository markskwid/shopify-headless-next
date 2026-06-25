type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string | null;
};

type Warning = { message: string; code: string | null };

type SuccessResponse<T> = {
  success: true;
  data: T;
  errors: null;
  pageInfo?: PageInfo | null;
  warnings?: Warning[] | null;
};

type ErrorResponse = {
  success: false;
  data: null;
  errors: string[];
  pageInfo?: null;
  warnings?: Warning[] | null;
};

export type API_RESPONSE<T> = SuccessResponse<T> | ErrorResponse;
