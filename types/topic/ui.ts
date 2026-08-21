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
