export const TOPIC_TITLE_MAX_LENGTH = 24;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type CreateTopicParseResult =
  | { ok: true; title: string; startAt: string }
  | { ok: false; error: string };

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function toTopicStartAtPayload(date: string): string {
  return `${date}T00:00:00`;
}

export function parseCreateTopicInput(input: {
  title: unknown;
  startDate: unknown;
}): CreateTopicParseResult {
  const title = asTrimmedString(input.title);
  if (!title) {
    return { ok: false, error: "토픽 이름은 필수입니다." };
  }
  if (title.length > TOPIC_TITLE_MAX_LENGTH) {
    return { ok: false, error: `토픽 이름은 ${TOPIC_TITLE_MAX_LENGTH}자 이하여야 합니다.` };
  }

  const startDate = asTrimmedString(input.startDate);
  if (!DATE_PATTERN.test(startDate)) {
    return { ok: false, error: "진행 날짜를 선택해 주세요." };
  }

  return { ok: true, title, startAt: toTopicStartAtPayload(startDate) };
}
