/** Diary Service REST DTO */

export type ApiDiaryTheme = {
  themeId: string;
  themeName: string;
};

export type ApiCreateDiaryThemeRequest = {
  themeName: string;
};

export type ApiUpdateDiaryThemeNameRequest = {
  themeName: string;
};

export type ApiDiaryVideoSummary = {
  diaryVideoId: string;
  thumbnailPath: string | null;
};

export type ApiDiaryHomeItem = {
  writtenDate: string;
  hasVideos: boolean;
  thumbnailPaths: string[];
};

export type ApiDiaryHomeResponse = {
  items: ApiDiaryHomeItem[];
};

export type ApiDiaryCalendarResponse = {
  year: number;
  month: number;
  writtenDates: string[];
};

export type ApiDiaryDateThemeGroup = {
  themeId: string;
  themeName: string;
  videos: ApiDiaryVideoSummary[];
};

export type ApiDiaryDateResponse = {
  writtenDate: string;
  themes: ApiDiaryDateThemeGroup[];
};

export type ApiDiaryTimelineDateGroup = {
  writtenDate: string;
  videoCount: number;
  videos: ApiDiaryVideoSummary[];
};

export type ApiDiaryTimelineResponse = {
  themeId: string;
  themeName: string;
  dates: ApiDiaryTimelineDateGroup[];
};

export type ApiDiaryTopicTransferRequest = {
  topicId: string;
  transferType: "COPY" | "MOVE";
};
