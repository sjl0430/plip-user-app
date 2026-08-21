export const DIARY_THEME_NAME_MAX_LENGTH = 20;

export type ThemeNameParseResult =
  | { ok: true; data: string }
  | { ok: false; error: string };

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseThemeName(value: unknown): ThemeNameParseResult {
  const themeName = asTrimmedString(value);
  if (!themeName) {
    return { ok: false, error: "테마 이름은 필수입니다." };
  }
  if (themeName.length > DIARY_THEME_NAME_MAX_LENGTH) {
    return {
      ok: false,
      error: `테마 이름은 ${DIARY_THEME_NAME_MAX_LENGTH}자 이하여야 합니다.`,
    };
  }
  return { ok: true, data: themeName };
}

export function parseThemeId(value: unknown): ThemeNameParseResult {
  const themeId = asTrimmedString(value);
  if (!themeId || !/^\d+$/.test(themeId)) {
    return { ok: false, error: "테마 ID가 올바르지 않습니다." };
  }
  return { ok: true, data: themeId };
}

export function parseDiaryDateParam(date: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return date;
}

export function shiftDiaryDate(date: string, days: number): string {
  const parsed = new Date(`${date}T12:00:00`);
  parsed.setDate(parsed.getDate() + days);

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsed);
}

export function getTodayKstDateString(today = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
}

export function isFutureDiaryDate(date: string, today = getTodayKstDateString()): boolean {
  return date > today;
}
