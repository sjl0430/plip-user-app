"use client";

import { ROUTES } from "@/config/routes";
import { useVideoCaptureFlow } from "@/hooks/useVideoCaptureFlow";
import { formatBlobSummary } from "@/lib/video/recorderMime";
import Link from "next/link";

export function VideoCaptureSection() {
  const {
    videoRef,
    status,
    elapsedMs,
    maxDurationMs,
    blob,
    mimeType,
    facingMode,
    flowPhase,
    flowError,
    uploadResult,
    uploading,
    prepareCamera,
    startRecording,
    stopRecording,
    flipCamera,
    retake,
    uploadCapture,
  } = useVideoCaptureFlow();

  const progressPct = Math.min(100, Math.round((elapsedMs / maxDurationMs) * 100));

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6 font-mono text-sm">
      <header className="space-y-2">
        <p className="text-xs text-black/50">
          <Link href={ROUTES.capture.videoApi} className="underline">
            {ROUTES.capture.videoApi}
          </Link>{" "}
          · Actions lab
        </p>
        <h1 className="text-lg font-semibold">Video Capture (Phase 0-F)</h1>
        <p className="text-black/60">
          5초 촬영 → upload-url → PUT → complete → GET → download-url poll
        </p>
        <p className="text-xs text-amber-700">
          (capture) route group — user-app 본 UI(/, /create)와 분리
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border bg-black">
        <video
          ref={videoRef}
          className="aspect-[9/16] max-h-[420px] w-full object-cover"
          autoPlay
          playsInline
          muted={flowPhase !== "complete"}
          controls={flowPhase === "preview" || flowPhase === "complete"}
        />
      </div>

      <div className="space-y-1 text-xs text-black/60">
        <p>phase: {flowPhase}</p>
        <p>recorder: {status}</p>
        <p>
          elapsed: {Math.min(elapsedMs, maxDurationMs)}ms / {maxDurationMs}ms ({progressPct}
          %)
        </p>
        <p>camera: {facingMode}</p>
        {mimeType ? <p>mime: {mimeType}</p> : null}
        {blob ? <p>blob: {formatBlobSummary(blob)}</p> : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={uploading || status === "recording"}
          onClick={() => void prepareCamera()}
        >
          카메라 재시작
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={uploading || status === "recording"}
          onClick={() => void flipCamera()}
        >
          카메라 전환
        </button>
        <button
          type="button"
          className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
          disabled={
            uploading ||
            status === "recording" ||
            status === "requesting" ||
            flowPhase === "complete"
          }
          onClick={() => void startRecording()}
        >
          {status === "recording" ? "촬영 중…" : "5초 촬영"}
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={uploading || status !== "recording"}
          onClick={stopRecording}
        >
          조기 종료
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={uploading || flowPhase !== "preview" || !blob}
          onClick={() => void uploadCapture()}
        >
          {uploading ? "업로드 중…" : "업로드 · complete"}
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={uploading}
          onClick={() => void retake()}
        >
          다시 촬영
        </button>
      </div>

      {flowError ? (
        <p className="rounded bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
          {flowError}
        </p>
      ) : null}

      {uploadResult ? (
        <div className="space-y-2 rounded bg-green-50 px-3 py-2 text-xs text-green-900">
          <p>videoUuid: {uploadResult.videoUuid}</p>
          <p>overlayTime: {uploadResult.complete.overlayTime}</p>
          <p>put: {uploadResult.putResult}</p>
          <p>downloadReady (GET): {String(uploadResult.detail.downloadReady)}</p>
          <p>
            download-url: {uploadResult.download.status}
            {uploadResult.download.status === "processing"
              ? ` · ${uploadResult.download.message}`
              : ""}
          </p>
          <p>download poll attempts: {uploadResult.downloadPollAttempts}</p>
          <p>playback: {uploadResult.playback.kind}</p>
          {uploadResult.playback.note ? (
            <p className="text-green-800">{uploadResult.playback.note}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
