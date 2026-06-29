import { ZodError } from "zod";

export const normalizeError = (error: unknown): string[] => {
  if (!error) return ["Unknown Error"];

  if (typeof error === "object" && "graphQLErrors" in error) {
    return (error as any).graphQLErrors.map((e: any) =>
      typeof e?.message === "string" ? e.message : "Unknown error",
    );
  }

  if (
    Array.isArray(error) &&
    error.length > 0 &&
    "message" in (error[0] ?? {})
  ) {
    return error.map((e: any) => e.message ?? "Unknown error");
  }

  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message);
  }

  if (error instanceof Error) {
    return [error.message];
  }

  //fallback
  return ["Unknown Error"];
};
