"use server";

import { ApiError } from "@/lib/api/apiFetch";
import * as diaryService from "@/services/diaryService";
import { actionFailure, actionSuccess, type ActionResult } from "@/types/action-result";
import { parseThemeId, parseThemeName } from "@/types/diary/schema";
import type { UiDiaryTheme } from "@/types/diary/ui";

function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof ApiError) {
    return actionFailure(`[${error.status}] ${error.message}`);
  }
  if (error instanceof Error) {
    return actionFailure(error.message);
  }
  return actionFailure("Unknown error");
}

export async function createThemeAction(themeName: unknown): Promise<ActionResult<UiDiaryTheme>> {
  const parsed = parseThemeName(themeName);
  if (!parsed.ok) {
    return actionFailure(parsed.error);
  }

  try {
    const theme = await diaryService.createDiaryTheme(parsed.data);
    return actionSuccess(theme);
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateThemeNameAction(
  themeId: unknown,
  themeName: unknown,
): Promise<ActionResult<UiDiaryTheme>> {
  const parsedId = parseThemeId(themeId);
  if (!parsedId.ok) {
    return actionFailure(parsedId.error);
  }

  const parsedName = parseThemeName(themeName);
  if (!parsedName.ok) {
    return actionFailure(parsedName.error);
  }

  try {
    const theme = await diaryService.updateDiaryThemeName(parsedId.data, parsedName.data);
    return actionSuccess(theme);
  } catch (error) {
    return toActionError(error);
  }
}

export async function deleteThemeAction(themeId: unknown): Promise<ActionResult<void>> {
  const parsedId = parseThemeId(themeId);
  if (!parsedId.ok) {
    return actionFailure(parsedId.error);
  }

  try {
    await diaryService.deleteDiaryTheme(parsedId.data);
    return actionSuccess(undefined);
  } catch (error) {
    return toActionError(error);
  }
}
