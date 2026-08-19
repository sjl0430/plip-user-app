import { getDevAccessToken } from "@/lib/api/devAccessToken";
import { getDevUserUuid } from "@/lib/api/env";
import { getRequestAccessTokenOverride } from "@/lib/auth/request-token-cache";
import { getServerAccessToken, getServerAuthJwt } from "@/lib/auth/server-token";

/** RSC/API 레이어 전용. NextAuth JWT 우선, 미로그인 dev 환경 fallback. */
export async function getActorUserHeaders(): Promise<Record<string, string>> {
  const override = getRequestAccessTokenOverride();
  if (override) {
    return {
      Authorization: `Bearer ${override}`,
    };
  }

  const accessToken = await getServerAccessToken();
  if (accessToken) {
    const jwt = await getServerAuthJwt();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };
    if (typeof jwt?.userUuid === "string" && jwt.userUuid) {
      headers["X-User-Uuid"] = jwt.userUuid;
    }
    return headers;
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
