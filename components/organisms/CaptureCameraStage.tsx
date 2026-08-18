"use client";

import { DailyIcon } from "@/components/atoms";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import type { RecorderStatus } from "@/hooks/useVideoRecorder";
import { formatRecordTimer } from "@/lib/video/formatRecordTimer";
import type { RefCallback } from "react";

type CaptureCameraStageProps = {
  videoRef: RefCallback<HTMLVideoElement>;
  status: RecorderStatus;
  error: string | null;
  elapsedMs: number;
  maxDurationMs: number;
  onBack: () => void;
  onStartRecording: () => void;
  onFlipCamera: () => void;
};

export function CaptureCameraStage({
  videoRef,
  status,
  error,
  elapsedMs,
  maxDurationMs,
  onBack,
  onStartRecording,
  onFlipCamera,
}: CaptureCameraStageProps) {
  const isRecording = status === "recording";
  const isBusy = status === "requesting" || isRecording;
  const showTimer = isRecording;

  return (
    <section className="dl-camera -mx-5 -mt-6" aria-label="카메라">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        autoPlay
        playsInline
        muted
      />

      <div className="absolute inset-x-0 top-0 z-10">
        <AuthTopBar title="" onBack={onBack} />
      </div>

      {error ? (
        <p
          className="absolute inset-x-4 top-20 z-10 rounded bg-red-600/90 px-3 py-2 text-center text-xs text-white"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {showTimer ? (
        <p className="dl-camera__timer" aria-live="polite">
          {formatRecordTimer(elapsedMs, maxDurationMs)}
        </p>
      ) : null}

      <div className="absolute inset-x-6 bottom-8 z-10 flex items-center justify-between">
        <button type="button" className="dl-icon-sq" aria-label="플래시" disabled={isBusy}>
          <DailyIcon name="alert" size={20} />
        </button>
        <button
          type="button"
          className={`dl-camera__shutter${isRecording ? " is-recording" : ""}`}
          aria-label={isRecording ? "촬영 중" : "촬영"}
          disabled={status === "requesting"}
          onClick={() => {
            if (!isRecording) {
              onStartRecording();
            }
          }}
        >
          <span className="dl-camera__shutter-inner" />
        </button>
        <button
          type="button"
          className="dl-icon-sq"
          aria-label="전환"
          disabled={isBusy}
          onClick={() => void onFlipCamera()}
        >
          <DailyIcon name="camera" size={20} />
        </button>
      </div>
    </section>
  );
}
