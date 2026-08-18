import { getDevUserUuid } from "@/lib/api/env";

/** RSC/API 레이어 전용. JWT 연동 시 Gateway 추출 헤더로 교체한다. */
export function getActorUserHeaders(): Record<string, string> {
  return {
    "X-User-Uuid": getDevUserUuid(),
  };
}
