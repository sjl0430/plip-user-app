export type UiAzitVisibility = "public" | "private";

export type UiAzit = {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  coverGradient: string;
  topicCount: number;
  visibility?: UiAzitVisibility;
  category?: string;
  maxMembers?: number;
  ownerName?: string;
  todayVideoCount?: number;
  videoCount?: number;
  topicSummary?: string;
  thumbnailSrc?: string;
  joined?: boolean;
};

export type UiAzitMember = {
  id: string;
  name: string;
  role: "owner" | "member";
};

export type UiAzitTopic = {
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
