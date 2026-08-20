import type { ApiCreateAgitRequest } from "@/types/agit/api";

export const AGIT_NAME_MAX_LENGTH = 20;
export const AGIT_DESCRIPTION_MAX_LENGTH = 100;
export const AGIT_DEFAULT_MAX_CAPACITY = 5;
export const AGIT_CAPACITY_MIN = 1;
export const AGIT_NICKNAME_MIN_LENGTH = 2;
export const AGIT_NICKNAME_MAX_LENGTH = 12;
export const AGIT_NICKNAME_PATTERN = /^[0-9A-Za-z가-힣]{2,12}$/;

export type CreateAgitParseResult =
  | { ok: true; data: ApiCreateAgitRequest }
  | { ok: false; error: string };

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asOptionalPath(value: unknown): string | undefined {
  const trimmed = asTrimmedString(value);
  return trimmed || undefined;
}

export function parseCreateAgitInput(input: {
  agitName: unknown;
  description?: unknown;
  maximumCapacity: unknown;
  nickname: unknown;
  thumbnailPath?: unknown;
  profileImagePath?: unknown;
}): CreateAgitParseResult {
  const agitName = asTrimmedString(input.agitName);
  if (!agitName) {
    return { ok: false, error: "아지트 제목은 필수입니다." };
  }
  if (agitName.length > AGIT_NAME_MAX_LENGTH) {
    return { ok: false, error: `아지트 제목은 ${AGIT_NAME_MAX_LENGTH}자 이하여야 합니다.` };
  }

  const description = asTrimmedString(input.description);
  if (description.length > AGIT_DESCRIPTION_MAX_LENGTH) {
    return {
      ok: false,
      error: `소개글은 ${AGIT_DESCRIPTION_MAX_LENGTH}자 이하여야 합니다.`,
    };
  }

  const maximumCapacity =
    typeof input.maximumCapacity === "number"
      ? input.maximumCapacity
      : Number(input.maximumCapacity);
  if (!Number.isInteger(maximumCapacity)) {
    return { ok: false, error: "인원수는 필수입니다." };
  }
  if (maximumCapacity < AGIT_CAPACITY_MIN || maximumCapacity > AGIT_DEFAULT_MAX_CAPACITY) {
    return {
      ok: false,
      error: `인원수는 ${AGIT_CAPACITY_MIN} 이상 ${AGIT_DEFAULT_MAX_CAPACITY} 이하여야 합니다.`,
    };
  }

  const nickname = asTrimmedString(input.nickname);
  if (!AGIT_NICKNAME_PATTERN.test(nickname)) {
    return {
      ok: false,
      error: `닉네임은 영문·숫자·한글 ${AGIT_NICKNAME_MIN_LENGTH}~${AGIT_NICKNAME_MAX_LENGTH}자이며, 특수문자와 공백을 사용할 수 없습니다.`,
    };
  }

  const thumbnailPath = asOptionalPath(input.thumbnailPath);
  const profileImagePath = asOptionalPath(input.profileImagePath);

  return {
    ok: true,
    data: {
      agitName,
      ...(description ? { description } : {}),
      maximumCapacity,
      nickname,
      ...(thumbnailPath ? { thumbnailPath } : {}),
      ...(profileImagePath ? { profileImagePath } : {}),
    },
  };
}
