/** Diary Service REST DTO */

export type ApiDiaryTheme = {
  id: number;
  themeUuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiDiaryThemesResponse = {
  themes: ApiDiaryTheme[];
};

export type ApiCreateDiaryThemeRequest = {
  name: string;
};

export type ApiUpdateDiaryThemeNameRequest = {
  name: string;
};

export type ApiDiaryVideoSummary = {
  diaryVideoId: string;
  thumbnailPath: string | null;
};

export type ApiDiaryHomeVideo = {
  id: number;
  themeId: number;
  themeName: string;
  videoUuid: string;
  caption: string | null;
  thumbnailUrl: string | null;
  createdAt: string;
};

export type ApiDiaryHomeSection = {
  date: string;
  videos: ApiDiaryHomeVideo[];
};

export type ApiDiaryHomeResponse = {
  sections: ApiDiaryHomeSection[];
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
