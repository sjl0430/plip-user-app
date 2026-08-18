export const API_ENDPOINTS = {
  agit: {
    me: "/api/v1/agits/me",
  },
  video: {
    uploadUrl: "/api/videos/upload-url",
    complete: (videoUuid: string) => `/api/videos/${videoUuid}/complete` as const,
    detail: (videoUuid: string) => `/api/videos/${videoUuid}` as const,
    downloadUrl: (videoUuid: string) => `/api/videos/${videoUuid}/download-url` as const,
  },
} as const;
