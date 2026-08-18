export function isStubPlaybackUrl(url: string): boolean {
  return url.includes("/stub-presigned-get/") || url.startsWith("/stub-media/");
}

export type PlaybackSource = {
  kind: "local" | "remote" | "none";
  url: string | null;
  note: string | null;
};

export function resolvePlaybackSource(
  localPreviewUrl: string | null | undefined,
  rawPlaybackUrl: string | null | undefined,
): PlaybackSource {
  if (localPreviewUrl) {
    return {
      kind: "local",
      url: localPreviewUrl,
      note: "촬영 직후 로컬 preview (Phase 0-F 기본 재생)",
    };
  }

  if (rawPlaybackUrl && !isStubPlaybackUrl(rawPlaybackUrl)) {
    return {
      kind: "remote",
      url: rawPlaybackUrl,
      note: null,
    };
  }

  if (rawPlaybackUrl && isStubPlaybackUrl(rawPlaybackUrl)) {
    return {
      kind: "none",
      url: null,
      note: "로컬 NoOp stub URL — AWS 연동 후 rawPlaybackUrl 재생 가능",
    };
  }

  return {
    kind: "none",
    url: null,
    note: "재생 URL 없음",
  };
}
