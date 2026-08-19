import * as agitApi from "@/lib/api/agitApi";
import type { ApiAgitDetail, ApiMyAgitItem } from "@/types/agit/api";
import type { UiAgit, UiMyAgit } from "@/types/agit/ui";

const DEFAULT_COVER_GRADIENT = "linear-gradient(104deg, #2e1f52 0%, #7a5cfa 100%)";

function mapMyAgit(item: ApiMyAgitItem): UiMyAgit {
  return {
    id: item.agitUuid,
    name: item.agitName,
  };
}

function mapAgitDetail(item: ApiAgitDetail): UiAgit {
  return {
    id: item.agitUuid,
    name: item.agitName,
    memberCount: item.currentMemberCount,
    description: item.description ?? "",
    coverGradient: DEFAULT_COVER_GRADIENT,
    topicCount: item.topics.length,
    maxMembers: item.maximumCapacity,
    ownerName: item.hostNickname,
    thumbnailSrc: item.thumbnailPath ?? undefined,
    joined: true,
  };
}

export async function listMyAgits(): Promise<UiMyAgit[]> {
  const items = await agitApi.getMyAgits();
  return items.map(mapMyAgit);
}

export async function getAgit(agitId: string): Promise<UiAgit> {
  const item = await agitApi.getAgit(agitId);
  return mapAgitDetail(item);
}
