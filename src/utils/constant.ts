export const METHODS = {
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT",
} as const;

export type HttpMethod = (typeof METHODS)[keyof typeof METHODS];