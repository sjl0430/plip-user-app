import * as agitApi from "@/lib/api/agitApi";
import type { ApiAgitDetail, ApiCreateAgitRequest, ApiCreateAgitResponse, ApiMyAgitItem } from "@/types/agit/api";
import type { UiAgit, UiCreateAgitInput } from "@/types/agit/ui";

const DEFAULT_COVER_GRADIENT = "linear-gradient(104deg, #2e1f52 0%, #7a5cfa 100%)";

function mapMyAgit(item: ApiMyAgitItem): UiAgit {
  return {
    id: item.agitUuid,
    name: item.agitName,
    memberCount: 0,
    description: "",
    coverGradient: DEFAULT_COVER_GRADIENT,
    topicCount: 0,
    joined: true,
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
    inviteCode: item.code,
    joined: true,
  };
}

export async function listMyAgits(): Promise<UiAgit[]> {
  const items = await agitApi.getMyAgits();
  return items.map(mapMyAgit);
}

export async function getAgit(agitId: string): Promise<UiAgit> {
  const item = await agitApi.getAgit(agitId);
  return mapAgitDetail(item);
}

function mapCreatedAgit(item: ApiCreateAgitResponse): UiAgit {
  return {
    id: item.agitUuid,
    name: item.agitName,
    memberCount: 1,
    description: item.description ?? "",
    coverGradient: DEFAULT_COVER_GRADIENT,
    topicCount: 0,
    maxMembers: item.maximumCapacity,
    ownerName: item.nickname,
    thumbnailSrc: item.thumbnailPath ?? undefined,
    inviteCode: item.code,
    joined: true,
  };
}

export async function createAgit(input: UiCreateAgitInput): Promise<UiAgit> {
  const body: ApiCreateAgitRequest = {
    agitName: input.agitName,
    maximumCapacity: input.maximumCapacity,
    nickname: input.nickname,
    ...(input.description ? { description: input.description } : {}),
    ...(input.thumbnailPath ? { thumbnailPath: input.thumbnailPath } : {}),
    ...(input.profileImagePath ? { profileImagePath: input.profileImagePath } : {}),
  };
  const created = await agitApi.createAgit(body);
  return mapCreatedAgit(created);
}
