import { API_ENDPOINTS } from "@/config/api-endpoints";
import { apiFetch } from "@/lib/api/apiFetch";
import { getActorUserHeaders } from "@/lib/api/actorHeaders";
import { getApiUrl } from "@/lib/api/env";
import type { ApiMyAgitItem } from "@/types/agit/api";

export async function getMyAgits(): Promise<ApiMyAgitItem[]> {
  return apiFetch<ApiMyAgitItem[]>(API_ENDPOINTS.agit.me, {
    method: "GET",
    baseUrl: getApiUrl(),
    headers: getActorUserHeaders(),
  });
}
