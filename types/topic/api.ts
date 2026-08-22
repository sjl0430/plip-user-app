export type ApiTopicListStatus = "ONGOING" | "UPCOMING" | "PAST";

export type ApiTopic = {
  topicUuid: string;
  agitUuid: string;
  creatorUuid: string;
  title: string | null;
  startAt: string;
  videoCount: number;
  uploadedByMe: boolean | null;
  createdAt: string;
};

export type ApiCreateTopicRequest = {
  agitUuid: string;
  creatorUuid: string;
  title: string;
  startAt?: string;
};

export type ApiTopicVideo = {
  videoUuid: string;
  userUuid: string;
  createdAt: string;
};
