export type CompactCalendarDayDetail = {
  videoCount: number;
  tags: string[];
  summary: string;
};

/** Figma 15 · Compact Calendar — August 2026 active days */
export const COMPACT_CALENDAR_AUG_2026: Record<number, CompactCalendarDayDetail> = {
  2: {
    videoCount: 2,
    tags: ["#7시_러닝_인증"],
    summary: "지민, 하린이 기록했어요.",
  },
  5: {
    videoCount: 1,
    tags: ["#아침루틴"],
    summary: "유나가 기록했어요.",
  },
  8: {
    videoCount: 3,
    tags: ["#7시_러닝_인증"],
    summary: "도현, 지민, 하린이 기록했어요.",
  },
  12: {
    videoCount: 2,
    tags: ["#아침루틴", "#7시_러닝_인증"],
    summary: "하린, 유나가 기록했어요.",
  },
  14: {
    videoCount: 4,
    tags: ["#7시_러닝_인증", "#아침루틴"],
    summary: "지민, 하린, 유나, 도현이 기록했어요.",
  },
  18: {
    videoCount: 2,
    tags: ["#7시_러닝_인증"],
    summary: "지민, 도현이 기록했어요.",
  },
  22: {
    videoCount: 3,
    tags: ["#아침루틴"],
    summary: "하린, 유나, 지민이 기록했어요.",
  },
  27: {
    videoCount: 1,
    tags: ["#7시_러닝_인증"],
    summary: "유나가 기록했어요.",
  },
};

export function getCompactCalendarDetail(
  year: number,
  month: number,
  day: number,
): CompactCalendarDayDetail | undefined {
  if (year === 2026 && month === 7) {
    return COMPACT_CALENDAR_AUG_2026[day];
  }
  return undefined;
}

export function listCompactCalendarActiveDays(year: number, month: number): number[] {
  if (year === 2026 && month === 7) {
    return Object.keys(COMPACT_CALENDAR_AUG_2026)
      .map(Number)
      .sort((a, b) => a - b);
  }
  return [];
}
