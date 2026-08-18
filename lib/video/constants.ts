/** plip-video backend contract: max 5 seconds (saved / displayed) */
export const MAX_RECORD_MS = 5_000;

/** MediaRecorder stop — 0.2s buffer so last frame isn't cut */
export const RECORD_STOP_MS = 5_200;

export const RECORD_TIMESLICE_MS = 250;

export const RECORDER_MIME_CANDIDATES = [
  "video/mp4",
  "video/webm;codecs=vp9",
  "video/webm",
] as const;

/** Presigned PUT Content-Type must match upload-url query param */
export const DEFAULT_UPLOAD_CONTENT_TYPE = "video/mp4";

export const DEFAULT_CAPTURE_CAPTION = "Phase 0-F capture";

/**
 * download-url 202 probe count.
 * 로컬 NoOp에서는 PROCESSING만 반환하므로 1회로 endpoint 검증만 수행 (3회×3s 대기 제거).
 */
export const DOWNLOAD_URL_MAX_ATTEMPTS = 1;
