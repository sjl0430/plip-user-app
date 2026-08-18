export type UiFeedClip = {
  id: string;
  authorName: string;
  authorHandle: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  agitName?: string;
  /** 아지트 토픽 라벨 (그룹피드) */
  topicTitle?: string;
  gradient: string;
  /** Figma-exported cover when available */
  coverSrc?: string;
};

/** 그룹영상 피드 탭 (개인 For You 제거) */
export type UiFeedTab = "myAgits" | "groupClips";
