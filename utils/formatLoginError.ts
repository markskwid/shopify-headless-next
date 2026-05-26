type ERR_CODE =
  | "UNIDENTIFIED_CUSTOMER"
  | "INVALID"
  | "TAKEN"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "BLANK";

const ERROR_MESSAGES: Record<ERR_CODE, string> = {
  UNIDENTIFIED_CUSTOMER: "Invalid email or password.",
  INVALID: "Please enter a valid email or password.",
  TAKEN: "This email is already in use.",
  TOO_SHORT: "Password is too short.",
  TOO_LONG: "Input is too long.",
  BLANK: "Email and password are required.",
};

export const formatLoginError = (errors: string | string[] | null): string => {
  if (!errors || errors.length === 0) return "Something went wrong. Try again.";
  const code = (Array.isArray(errors) ? errors[0] : errors) as ERR_CODE;
  return ERROR_MESSAGES[code] ?? "Something went wrong. Try again.";
};
