import { getVideoApiBaseUrl } from "@/lib/api/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  searchParams?: Record<string, string | undefined>;
  /** 생략 시 기존처럼 VIDEO_API_BASE_URL */
  baseUrl?: string;
};

function buildUrl(
  path: string,
  searchParams?: Record<string, string | undefined>,
  baseUrl?: string,
): string {
  const base = (baseUrl ?? getVideoApiBaseUrl()).replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }

  return url.toString();
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, searchParams, headers, baseUrl, ...rest } = options;
  const hasJsonBody = body !== undefined;

  const response = await fetch(buildUrl(path, searchParams, baseUrl), {
    ...rest,
    headers: {
      ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: hasJsonBody ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const parsedBody = contentType.includes("application/json")
    ? await response.json().catch(() => undefined)
    : await response.text().catch(() => undefined);

  if (!response.ok) {
    const message =
      typeof parsedBody === "object" &&
      parsedBody !== null &&
      "message" in parsedBody &&
      typeof parsedBody.message === "string"
        ? parsedBody.message
        : `API request failed (${response.status})`;

    throw new ApiError(message, response.status, parsedBody);
  }

  return parsedBody as T;
}

export async function apiFetchWithStatus<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<{ status: number; data: T }> {
  const { body, searchParams, headers, baseUrl, ...rest } = options;
  const hasJsonBody = body !== undefined;

  const response = await fetch(buildUrl(path, searchParams, baseUrl), {
    ...rest,
    headers: {
      ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: hasJsonBody ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const parsedBody = contentType.includes("application/json")
    ? await response.json().catch(() => undefined)
    : await response.text().catch(() => undefined);

  if (!response.ok) {
    const message =
      typeof parsedBody === "object" &&
      parsedBody !== null &&
      "message" in parsedBody &&
      typeof parsedBody.message === "string"
        ? parsedBody.message
        : `API request failed (${response.status})`;

    throw new ApiError(message, response.status, parsedBody);
  }

  return { status: response.status, data: parsedBody as T };
}
