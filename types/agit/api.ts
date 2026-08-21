export type ApiMyAgitItem = {
  agitUuid: string;
  agitName: string;
};

export type ApiAgitMemberRole = "HOST" | "GUEST";

export type ApiAgitStatus = "ACTIVE" | "DELETED";

export type ApiAgitDetailMember = {
  userUuid: string;
  nickname: string;
  profileImagePath: string | null;
  role: ApiAgitMemberRole;
};

export type ApiAgitDetailTopic = {
  topicId: string;
  startedAt: string | null;
};

export type ApiAgitDetail = {
  agitUuid: string;
  agitName: string;
  description: string | null;
  thumbnailPath: string | null;
  status: ApiAgitStatus;
  maximumCapacity: number;
  currentMemberCount: number;
  hostNickname: string;
  myRole: ApiAgitMemberRole;
  code: string;
  members: ApiAgitDetailMember[];
  topics: ApiAgitDetailTopic[];
};

export type ApiCreateAgitRequest = {
  agitName: string;
  description?: string;
  maximumCapacity: number;
  thumbnailPath?: string;
  nickname: string;
  profileImagePath?: string;
};

export type ApiCreateAgitResponse = {
  agitUuid: string;
  agitName: string;
  description: string | null;
  maximumCapacity: number;
  code: string;
  thumbnailPath: string | null;
  ampId: number;
  nickname: string;
  profileImagePath: string | null;
  role: ApiAgitMemberRole;
};
