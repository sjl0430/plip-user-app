import { API_ENDPOINTS } from "@/config/api-endpoints";
import { getActorUserHeaders } from "@/lib/api/actorHeaders";
import { apiFetch } from "@/lib/api/apiFetch";
import { getApiUrl } from "@/lib/api/env";
import { withAuthRetry } from "@/lib/api/withAuthRetry";
import type { ApiTopic, ApiTopicVideo } from "@/types/topic/api";

function topicFetch<T>(path: string, options: Parameters<typeof apiFetch>[1] = {}): Promise<T> {
  return withAuthRetry(async () =>
    apiFetch<T>(path, {
      baseUrl: getApiUrl(),
      headers: await getActorUserHeaders(),
      ...options,
    }),
  );
}

export async function listTopics(agitUuid: string): Promise<ApiTopic[]> {
  return topicFetch<ApiTopic[]>(API_ENDPOINTS.topic.list, {
    method: "GET",
    searchParams: { agitUuid },
  });
}

export async function listTopicVideos(topicUuid: string): Promise<ApiTopicVideo[]> {
  return topicFetch<ApiTopicVideo[]>(API_ENDPOINTS.topic.videos(topicUuid), {
    method: "GET",
  });
}
