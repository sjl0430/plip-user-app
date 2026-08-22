"use server";

import { ApiError } from "@/lib/api/apiFetch";
import { getServerUserUuid } from "@/lib/auth/server-token";
import * as topicService from "@/services/topicService";
import { actionFailure, actionSuccess, type ActionResult } from "@/types/action-result";
import type { ApiTopicListStatus } from "@/types/topic/api";
import { parseCreateTopicInput } from "@/types/topic/schema";
import type { UiTopicListItem } from "@/types/topic/ui";

function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof ApiError) {
    return actionFailure(`[${error.status}] ${error.message}`);
  }
  if (error instanceof Error) {
    return actionFailure(error.message);
  }
  return actionFailure("Unknown error");
}

export async function listTopicsByStatusAction(
  agitId: string,
  status: ApiTopicListStatus,
  limit: number,
): Promise<ActionResult<UiTopicListItem[]>> {
  try {
    const items = await topicService.listTopicsByStatus(agitId, status, limit);
    return actionSuccess(items);
  } catch (error) {
    return toActionError(error);
  }
}

export async function createTopicAction(
  agitId: string,
  input: { title: unknown; startDate: unknown },
): Promise<ActionResult<void>> {
  const creatorUuid = await getServerUserUuid();
  if (!creatorUuid) {
    return actionFailure("로그인이 필요합니다.");
  }

  const parsed = parseCreateTopicInput(input);
  if (!parsed.ok) {
    return actionFailure(parsed.error);
  }

  try {
    await topicService.createTopic({
      agitUuid: agitId,
      creatorUuid,
      title: parsed.title,
      startAt: parsed.startAt,
    });
    return actionSuccess(undefined);
  } catch (error) {
    return toActionError(error);
  }
}
