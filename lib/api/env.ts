const DEFAULT_API_URL = "http://localhost:8080";
const DEFAULT_VIDEO_API_BASE_URL = "http://localhost:8085";
const DEFAULT_DEV_USER_UUID = "00000000-0000-4000-8000-000000000001";

export function getApiUrl(): string {
  return process.env.API_URL?.trim() || DEFAULT_API_URL;
}

export function getVideoApiBaseUrl(): string {
  return process.env.VIDEO_API_BASE_URL?.trim() || DEFAULT_VIDEO_API_BASE_URL;
}

export function getDevUserUuid(): string {
  return process.env.DEV_USER_UUID?.trim() || DEFAULT_DEV_USER_UUID;
}
