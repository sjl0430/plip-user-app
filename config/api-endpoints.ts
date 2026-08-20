/** Gateway `/api/{serviceId}/**` + StripPrefix=2 — Gateway 경유 시 auth/users에 적용 */
function gatewayPath(serviceId: string, servicePath: string): string {
  const normalized = servicePath.startsWith("/") ? servicePath : `/${servicePath}`;
  return `/api/${serviceId}${normalized}`;
}

export const API_ENDPOINTS = {
  auth: {
    otpRequest: "/api/v1/auth/email/otp-request",
    otpVerify: "/api/v1/auth/email/otp-verify",
    signupLocal: "/api/v1/auth/signup/local",
    loginLocal: "/api/v1/auth/login/local",
    loginSocial: (provider: string) => `/api/v1/auth/login/social/${provider}` as const,
    reissue: "/api/v1/auth/reissue",
    logout: "/api/v1/auth/logout",
    passwordReset: "/api/v1/auth/password-reset",
  },
  users: {
    me: "/api/v1/users/me",
    profile: "/api/v1/users/me/profile",
    password: "/api/v1/users/me/password",
    notificationSettings: "/api/v1/users/me/notification-settings",
    restore: "/api/v1/users/me/restore",
  },
  agit: {
    me: gatewayPath("agit", "/api/v1/agits/me"),
    detail: (agitUuid: string) => gatewayPath("agit", `/api/v1/agits/${agitUuid}`),
  },
  video: {
    uploadUrl: "/api/videos/upload-url",
    complete: (videoUuid: string) => `/api/videos/${videoUuid}/complete` as const,
    detail: (videoUuid: string) => `/api/videos/${videoUuid}` as const,
    downloadUrl: (videoUuid: string) => `/api/videos/${videoUuid}/download-url` as const,
  },
} as const;
