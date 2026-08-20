export type UiAgitVisibility = "public" | "private";

export type UiMyAgit = {
  id: string;
  name: string;
};

export type UiAgit = {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  coverGradient: string;
  topicCount: number;
  visibility?: UiAgitVisibility;
  category?: string;
  maxMembers?: number;
  ownerName?: string;
  todayVideoCount?: number;
  videoCount?: number;
  topicSummary?: string;
  thumbnailSrc?: string;
  joined?: boolean;
  hasNewChat?: boolean;
  hasTodayTopic?: boolean;
};

export type UiAgitMember = {
  id: string;
  name: string;
  role: "owner" | "member";
};

export type UiAgitTopic = {
  id: string;
  title: string;
  clipCount: number;
};

export type UiChatMessage = {
  id: string;
  senderName: string;
  body: string;
  isMine: boolean;
  time?: string;
  replyTo?: {
    name: string;
    excerpt: string;
  };
};
