import { API_ENDPOINTS } from "@/config/api-endpoints";
import { getActorUserHeaders } from "@/lib/api/actorHeaders";
import { ApiError, apiFetch } from "@/lib/api/apiFetch";
import { clearDevAccessToken } from "@/lib/api/devAccessToken";
import { getApiUrl } from "@/lib/api/env";
import type { ApiMyAgitItem } from "@/types/agit/api";

export async function getMyAgits(): Promise<ApiMyAgitItem[]> {
  try {
    return await requestMyAgits();
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }
    clearDevAccessToken();
    return requestMyAgits();
  }
}

async function requestMyAgits(): Promise<ApiMyAgitItem[]> {
  return apiFetch<ApiMyAgitItem[]>(API_ENDPOINTS.agit.me, {
    method: "GET",
    baseUrl: getApiUrl(),
    headers: await getActorUserHeaders(),
  });
}
