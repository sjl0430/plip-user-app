"use server";

import { ApiError } from "@/lib/api/apiFetch";
import * as agitService from "@/services/agitService";
import { actionFailure, actionSuccess, type ActionResult } from "@/types/action-result";
import { parseCreateAgitInput } from "@/types/agit/schema";
import type { UiAgit, UiCreateAgitInput } from "@/types/agit/ui";

function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof ApiError) {
    return actionFailure(`[${error.status}] ${error.message}`);
  }
  if (error instanceof Error) {
    return actionFailure(error.message);
  }
  return actionFailure("Unknown error");
}

export async function leaveAgitAction(agitId: string): Promise<ActionResult<void>> {
  try {
    await agitService.leaveAgit(agitId);
    return actionSuccess(undefined);
  } catch (error) {
    return toActionError(error);
  }
}

export async function createAgitAction(
  input: UiCreateAgitInput,
): Promise<ActionResult<UiAgit>> {
  const parsed = parseCreateAgitInput(input);
  if (!parsed.ok) {
    return actionFailure(parsed.error);
  }

  try {
    const agit = await agitService.createAgit(parsed.data);
    return actionSuccess(agit);
  } catch (error) {
    return toActionError(error);
  }
}
