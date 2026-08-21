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
  if (!themeId) {
    return { ok: false, error: "테마 ID가 올바르지 않습니다." };
  }
  return { ok: true, data: themeId };
}
