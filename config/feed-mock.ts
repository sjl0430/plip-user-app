import type { UiFeedClip } from "@/types/feed/ui";

/** 소속 아지트 그룹영상 피드 mock (개인 For You 아님) */
export const FEED_CLIPS: UiFeedClip[] = [
  {
    id: "clip-1",
    authorName: "하린",
    authorHandle: "@harin",
    caption: "오늘도 5초, 어제보다 가볍게.",
    likeCount: 128,
    commentCount: 12,
    shareCount: 6,
    agitName: "새벽 러너스",
    topicTitle: "7시_러닝_인증",
    gradient: "linear-gradient(160deg, #1a2744 0%, #0b1753 45%, #051219 100%)",
    coverSrc: "/plip/v13/shorts-feed.png",
  },
  {
    id: "clip-2",
    authorName: "클립러",
    authorHandle: "@clipper",
    caption: "운동 루틴 30초 요약",
    likeCount: 42,
    commentCount: 8,
    shareCount: 3,
    agitName: "헬스 아지트",
    topicTitle: "오늘의 루틴",
    gradient: "linear-gradient(160deg, #14283a 0%, #032426 50%, #051219 100%)",
  },
  {
    id: "clip-3",
    authorName: "요리왕",
    authorHandle: "@cook_plip",
    caption: "5분 레시피 · 저녁 메뉴",
    likeCount: 91,
    commentCount: 21,
    shareCount: 11,
    agitName: "집밥 연구소",
    topicTitle: "저녁 메뉴",
    gradient: "linear-gradient(160deg, #2a1a3a 0%, #1e228a 48%, #051219 100%)",
  },
];
