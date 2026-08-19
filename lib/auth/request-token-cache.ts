/** 401 reissue 후 동일 요청 체인에서 Bearer 재시도용 (세션 쿠키 갱신 전) */
let requestAccessTokenOverride: string | undefined;

export function setRequestAccessTokenOverride(token: string | undefined): void {
  requestAccessTokenOverride = token;
}

export function getRequestAccessTokenOverride(): string | undefined {
  return requestAccessTokenOverride;
}

export function clearRequestAccessTokenOverride(): void {
  requestAccessTokenOverride = undefined;
}
