export type ApiErrorBody = {
  code?: string;
  message?: string;
};

export type ApiLocalLoginRequest = {
  email: string;
  password: string;
};

export type ApiTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  userUuid: string;
};

export type ApiLocalLoginResponse = ApiTokenResponse;

export type ApiSocialLoginRequest = {
  accessToken: string;
  termsAgreements?: ApiTermAgreement[];
};

export type ApiTermAgreement = {
  termId: number;
  agreed: boolean;
};

export type ApiSocialLoginResponse = ApiTokenResponse & {
  newUser?: boolean;
};

export type ApiTokenReissueRequest = {
  refreshToken: string;
};

export type ApiTokenReissueResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

export type ApiLogoutRequest = {
  refreshToken: string;
};

export type ApiLogoutResponse = {
  code?: string;
  message?: string;
};

export type ApiAccountRestoreRequest = {
  email?: string;
  password?: string;
  accessToken?: string;
};

export type ApiAccountRestoreResponse = ApiTokenResponse & {
  code?: string;
  message?: string;
};
