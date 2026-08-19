/** Gateway `/api/{serviceId}/**` + StripPrefix=2 */
function gatewayPath(serviceId: string, servicePath: string): string {
  const normalized = servicePath.startsWith("/") ? servicePath : `/${servicePath}`;
  return `/api/${serviceId}${normalized}`;
}

export const API_ENDPOINTS = {
  auth: {
    loginLocal: gatewayPath("user", "/api/v1/auth/login/local"),
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
