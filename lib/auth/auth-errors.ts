export const AUTH_ERROR_CODES = {
  PENDING_RESTORE: "AUTH_010",
} as const;

export function getApiErrorCode(body: unknown): string | undefined {
  if (typeof body === "object" && body !== null && "code" in body) {
    const code = (body as { code?: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}
