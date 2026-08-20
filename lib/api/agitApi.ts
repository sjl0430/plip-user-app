import { API_ENDPOINTS } from "@/config/api-endpoints";
import { getActorUserHeaders } from "@/lib/api/actorHeaders";
import { apiFetch } from "@/lib/api/apiFetch";
import { getApiUrl } from "@/lib/api/env";
import { withAuthRetry } from "@/lib/api/withAuthRetry";
import type { ApiAgitDetail, ApiCreateAgitRequest, ApiCreateAgitResponse, ApiMyAgitItem } from "@/types/agit/api";

export async function getMyAgits(): Promise<ApiMyAgitItem[]> {
  return withAuthRetry(async () =>
    apiFetch<ApiMyAgitItem[]>(API_ENDPOINTS.agit.me, {
      method: "GET",
      baseUrl: getApiUrl(),
      headers: await getActorUserHeaders(),
    }),
  );
}

export async function getAgit(agitUuid: string): Promise<ApiAgitDetail> {
  return withAuthRetry(async () =>
    apiFetch<ApiAgitDetail>(API_ENDPOINTS.agit.detail(agitUuid), {
      method: "GET",
      baseUrl: getApiUrl(),
      headers: await getActorUserHeaders(),
    }),
  );
}

export async function createAgit(body: ApiCreateAgitRequest): Promise<ApiCreateAgitResponse> {
  return withAuthRetry(async () =>
    apiFetch<ApiCreateAgitResponse>(API_ENDPOINTS.agit.create, {
      method: "POST",
      baseUrl: getApiUrl(),
      headers: await getActorUserHeaders(),
      body,
    }),
  );
}
