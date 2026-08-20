import { getDevAccessToken } from "@/lib/api/devAccessToken";
import { getDevUserUuid } from "@/lib/api/env";
import { getSessionAuthHeaders } from "@/lib/auth/server-token";

/** RSC/API 레이어 전용. NextAuth JWT 우선, 미로그인 dev 환경 fallback. */
export async function getActorUserHeaders(): Promise<Record<string, string>> {
  const sessionHeaders = await getSessionAuthHeaders();
  if (sessionHeaders.Authorization) {
    return sessionHeaders;
  }

  const headers: Record<string, string> = {
    "X-User-Uuid": getDevUserUuid(),
  };

  const devToken = await getDevAccessToken();
  if (devToken) {
    headers.Authorization = `Bearer ${devToken}`;
  }

  return headers;
}
