export type DiaryThemeId = "daily" | "exercise" | "cooking";

export type UiDiaryTheme = {
  id: DiaryThemeId;
  name: string;
};

export type UiDiaryClip = {
  id: string;
  themeId: DiaryThemeId;
  date: string;
};

export type UiDiaryDateEntry = {
  date: string;
  relativeLabel?: string;
  hasClips: boolean;
  isEmpty?: boolean;
};

export type UiDiaryDateThemeGroup = {
  themeId: DiaryThemeId;
  themeName: string;
  clipCount: number;
};

export type UiDiaryDateGroup = {
  date: string;
  themes: UiDiaryDateThemeGroup[];
};

export type UiDiaryThemeDateGroup = {
  date: string;
  clipCount: number;
};
