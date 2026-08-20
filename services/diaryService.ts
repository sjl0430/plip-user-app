import * as diaryApi from "@/lib/api/diaryApi";
import type {
  ApiDiaryDateResponse,
  ApiDiaryDateThemeGroup,
  ApiDiaryHomeItem,
  ApiDiaryTheme,
  ApiDiaryTimelineDateGroup,
  ApiDiaryTimelineResponse,
  ApiDiaryVideoSummary,
} from "@/types/diary/api";
import type {
  UiDiaryClip,
  UiDiaryDateEntry,
  UiDiaryDateGroup,
  UiDiaryDateThemeGroup,
  UiDiaryTheme,
  UiDiaryThemeDateGroup,
} from "@/types/diary/ui";

function mapTheme(theme: ApiDiaryTheme): UiDiaryTheme {
  return {
    id: theme.themeId,
    name: theme.themeName,
  };
}

function toOptionalThumbnail(path: string | null): string | undefined {
  return path?.trim() ? path : undefined;
}

function mapVideoSummary(video: ApiDiaryVideoSummary, themeId: string, date: string): UiDiaryClip {
  return {
    id: video.diaryVideoId,
    themeId,
    date,
    thumbnailSrc: toOptionalThumbnail(video.thumbnailPath),
  };
}

function resolveRelativeLabel(date: string, today = new Date()): string | undefined {
  const target = new Date(`${date}T12:00:00`);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetStart = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffDays = Math.round((todayStart.getTime() - targetStart.getTime()) / 86_400_000);

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays === 2) return "그제";
  return undefined;
}

function mapHomeItem(item: ApiDiaryHomeItem): UiDiaryDateEntry {
  const thumbnailPaths = item.thumbnailPaths
    .map((path) => toOptionalThumbnail(path))
    .filter((path): path is string => Boolean(path));

  return {
    date: item.writtenDate,
    relativeLabel: resolveRelativeLabel(item.writtenDate),
    hasClips: item.hasVideos,
    isEmpty: !item.hasVideos,
    thumbnailPaths,
  };
}

function mapDateThemeGroup(group: ApiDiaryDateThemeGroup, date: string): UiDiaryDateThemeGroup {
  return {
    themeId: group.themeId,
    themeName: group.themeName,
    clipCount: group.videos.length,
    clips: group.videos.map((video) => mapVideoSummary(video, group.themeId, date)),
  };
}

function mapTimelineDateGroup(group: ApiDiaryTimelineDateGroup, themeId: string): UiDiaryThemeDateGroup {
  return {
    date: group.writtenDate,
    clipCount: group.videoCount,
    clips: group.videos.map((video) => mapVideoSummary(video, themeId, group.writtenDate)),
  };
}

function mapDateResponse(response: ApiDiaryDateResponse): UiDiaryDateGroup {
  return {
    date: response.writtenDate,
    themes: response.themes.map((group) => mapDateThemeGroup(group, response.writtenDate)),
  };
}

function mapTimelineResponse(response: ApiDiaryTimelineResponse): UiDiaryThemeDateGroup[] {
  return response.dates.map((group) => mapTimelineDateGroup(group, response.themeId));
}

export async function listDiaryThemes(): Promise<UiDiaryTheme[]> {
  const themes = await diaryApi.getDiaryThemes();
  return themes.map(mapTheme);
}

export async function getDiaryTheme(themeId: string): Promise<UiDiaryTheme> {
  const theme = await diaryApi.getDiaryTheme(themeId);
  return mapTheme(theme);
}

export async function createDiaryTheme(themeName: string): Promise<UiDiaryTheme> {
  const created = await diaryApi.createDiaryTheme({ themeName });
  return mapTheme(created);
}

export async function updateDiaryThemeName(themeId: string, themeName: string): Promise<UiDiaryTheme> {
  const updated = await diaryApi.updateDiaryThemeName(themeId, { themeName });
  return mapTheme(updated);
}

export async function deleteDiaryTheme(themeId: string): Promise<void> {
  await diaryApi.deleteDiaryTheme(themeId);
}

export async function getDiaryHomeFeed(): Promise<UiDiaryDateEntry[]> {
  const response = await diaryApi.getDiaryHome();
  return response.items.map(mapHomeItem);
}

export async function getDiaryCalendarDates(year: number, month: number): Promise<string[]> {
  const response = await diaryApi.getDiaryCalendar(year, month);
  return response.writtenDates;
}

export async function getDiaryDateGroup(date: string): Promise<UiDiaryDateGroup> {
  const response = await diaryApi.getDiaryByDate(date);
  return mapDateResponse(response);
}

export async function getDiaryThemeTimeline(themeId: string): Promise<{
  theme: UiDiaryTheme;
  dateGroups: UiDiaryThemeDateGroup[];
}> {
  const response = await diaryApi.getDiaryThemeTimeline(themeId);
  return {
    theme: {
      id: response.themeId,
      name: response.themeName,
    },
    dateGroups: mapTimelineResponse(response),
  };
}

export async function transferDiaryVideoToTopic(
  diaryVideoId: string,
  topicId: string,
  transferType: "COPY" | "MOVE",
): Promise<void> {
  await diaryApi.transferDiaryVideoTopic(diaryVideoId, { topicId, transferType });
}

export async function unbindDiaryVideo(diaryVideoId: string): Promise<void> {
  await diaryApi.unbindDiaryVideo(diaryVideoId);
}
