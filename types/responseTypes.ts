export type API_RESPONSE<T> = {
  success: boolean;
  data: T | null;
  errors: string[] | null;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor?: string | null;
  } | null;
  warnings?: { message: string; code: string }[] | null;
};
