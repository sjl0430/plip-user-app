import type { UiTopicVideo } from "@/types/topic/ui";

const THUMBS = [
  "/plip/v13/topic-video-1.png",
  "/plip/v13/topic-video-2.png",
  "/plip/v13/topic-video-3.png",
  "/plip/v13/topic-video-4.png",
] as const;

const PROFILES = [
  { src: "/plip/daily-loop/avatar-yj.svg", nickname: "유진" },
  { src: "/plip/daily-loop/avatar-minji.svg", nickname: "민지" },
  { src: "/plip/v13/profile-avatar.svg", nickname: "러닝메이트" },
  { src: "/plip/v13/azit-avatar.svg", nickname: "한강러" },
] as const;

const CAPTIONS = [
  "오늘 5km 완주",
  "아침 공복 러닝",
  "한강 바람 좋음",
  "",
  "스트레칭 끝",
  "페이스 유지",
  "야간 코스 도전",
  "주말 회복 런",
] as const;

const TIMES = [
  "2026-08-18T13:10:00+09:00",
  "2026-08-18T13:45:00+09:00",
  "2026-08-18T16:42:00+09:00",
  "2026-08-18T07:12:00+09:00",
  "2026-08-18T08:05:00+09:00",
  "2026-08-18T19:20:00+09:00",
  "2026-08-18T21:03:00+09:00",
  "2026-08-18T06:48:00+09:00",
] as const;

export const TOPIC_MOCK_VIDEOS: UiTopicVideo[] = TIMES.map((uploadedAt, index) => {
  const profile = PROFILES[index % PROFILES.length];
  return {
    id: `topic-clip-${index + 1}`,
    thumbnailSrc: THUMBS[index % THUMBS.length],
    profileImageSrc: profile.src,
    profileNickname: profile.nickname,
    uploadedAt,
    caption: CAPTIONS[index],
  };
});

export const TOPIC_PREVIEW_COUNTS = [0, 3, 5, 8] as const;

export type TopicPreviewCount = (typeof TOPIC_PREVIEW_COUNTS)[number];

export function getTopicPreviewVideos(count: number): UiTopicVideo[] {
  if (count <= 0) {
    return [];
  }
  return TOPIC_MOCK_VIDEOS.slice(0, Math.min(count, TOPIC_MOCK_VIDEOS.length));
}

export function parseTopicPreviewCount(value: string | string[] | undefined): TopicPreviewCount {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "0") {
    return 0;
  }
  const parsed = Number(raw);
  if (parsed === 3 || parsed === 5 || parsed === 8) {
    return parsed;
  }
  return 8;
}
