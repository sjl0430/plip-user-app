import { getDevAccessToken } from "@/lib/api/devAccessToken";
import { getDevUserUuid } from "@/lib/api/env";

/** RSC/API 레이어 전용. JWT 연동 전 개발용 Bearer + X-User-Uuid. */
export async function getActorUserHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "X-User-Uuid": getDevUserUuid(),
  };

  const token = await getDevAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
