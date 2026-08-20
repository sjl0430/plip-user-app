import { API_ENDPOINTS } from "@/config/api-endpoints";
import { ApiError, apiFetch } from "@/lib/api/apiFetch";
import { getApiUrl, getDevLoginEmail, getDevLoginPassword } from "@/lib/api/env";

type LocalLoginResponse = {
  accessToken?: string;
};

let cachedAccessToken: string | undefined;
let pendingLogin: Promise<string | undefined> | undefined;

export function clearDevAccessToken(): void {
  cachedAccessToken = undefined;
  pendingLogin = undefined;
}

export async function getDevAccessToken(): Promise<string | undefined> {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }
  if (pendingLogin) {
    return pendingLogin;
  }

  const email = getDevLoginEmail();
  const password = getDevLoginPassword();
  if (!email || !password) {
    return undefined;
  }

  pendingLogin = requestDevAccessToken(email, password).finally(() => {
    pendingLogin = undefined;
  });
  return pendingLogin;
}

async function requestDevAccessToken(email: string, password: string): Promise<string | undefined> {
  try {
    const data = await apiFetch<LocalLoginResponse>(API_ENDPOINTS.auth.loginLocal, {
      method: "POST",
      baseUrl: getApiUrl(),
      body: { email, password },
      auth: false,
    });
    const token = data.accessToken?.trim();
    cachedAccessToken = token || undefined;
    return cachedAccessToken;
  } catch (error) {
    cachedAccessToken = undefined;
    if (error instanceof ApiError) {
      throw new ApiError(
        `개발용 로그인에 실패했습니다 (${error.status}): ${error.message}`,
        error.status,
        error.body,
      );
    }
    throw error;
  }
}
