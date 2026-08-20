export type SocialProvider = "google" | "kakao" | "naver";

export type UiAuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  userUuid: string;
};

export type UiLoginCredentials = {
  email: string;
  password: string;
};

export type UiRestoreLocalPayload = {
  type: "local";
  email: string;
  password: string;
};

export type UiRestoreSocialPayload = {
  type: "social";
  provider: SocialProvider;
  accessToken: string;
};

export type UiRestorePayload = UiRestoreLocalPayload | UiRestoreSocialPayload;
