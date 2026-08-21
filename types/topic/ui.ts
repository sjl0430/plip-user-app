export type UiTopicVideo = {
  id: string;
  thumbnailSrc: string;
  profileImageSrc: string;
  profileNickname: string;
  uploadedAt: string;
  caption: string;
};

export type UiTopic = {
  id: string;
  videos: UiTopicVideo[];
};

export type UiTopicSummary = {
  id: string;
  title: string;
  startAt: string;
  isToday: boolean;
};

export type UiTopicGallery = {
  topic: UiTopicSummary | null;
  videos: UiTopicVideo[];
};
