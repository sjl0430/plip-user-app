"use client";

import { MAX_RECORD_MS } from "@/lib/video/constants";
import { pickRecorderMimeType, requestCameraStream } from "@/lib/video/recorderMime";
import { useCallback, useEffect, useRef, useState } from "react";

export type RecorderStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "recording"
  | "preview"
  | "error";

export type UseVideoRecorderOptions = {
  maxDurationMs?: number;
  facingMode?: "user" | "environment";
  /** Mount 시 카메라 권한 요청 (default: true) */
  autoPrepare?: boolean;
};

export function useVideoRecorder(options: UseVideoRecorderOptions = {}) {
  const maxDurationMs = options.maxDurationMs ?? MAX_RECORD_MS;
  const autoPrepare = options.autoPrepare ?? true;

  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    options.facingMode ?? "user",
  );

  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | undefined>();
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoPrepareStartedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (stopTimerRef.current !== null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }

    if (tickTimerRef.current !== null) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setLiveStream(null);
  }, []);

  const resetPreview = useCallback(() => {
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return null;
    });
    setBlob(null);
    setElapsedMs(0);
  }, []);

  const prepareCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("카메라는 HTTPS 또는 localhost에서만 사용할 수 있습니다.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("requesting");

    try {
      stopStream();
      resetPreview();

      const stream = await requestCameraStream(facingMode);
      streamRef.current = stream;
      setLiveStream(stream);
      setStatus("ready");
    } catch (cause) {
      stopStream();
      const message =
        cause instanceof Error
          ? cause.message
          : "Camera permission denied or unavailable";
      setError(message);
      setStatus("error");
    }
  }, [facingMode, resetPreview, stopStream]);

  const stopRecording = useCallback(() => {
    clearTimers();

    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  }, [clearTimers]);

  const startRecording = useCallback(async () => {
    setError(null);

    if (!streamRef.current) {
      await prepareCamera();
    }

    const stream = streamRef.current;
    if (!stream) {
      setError("Camera stream is not ready");
      setStatus("error");
      return;
    }

    const selectedMimeType = pickRecorderMimeType();
    if (!selectedMimeType) {
      setError("MediaRecorder is not supported in this browser");
      setStatus("error");
      return;
    }

    resetPreview();
    chunksRef.current = [];

    const recorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
    recorderRef.current = recorder;
    setMimeType(selectedMimeType);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      clearTimers();

      const recordedBlob = new Blob(chunksRef.current, { type: selectedMimeType });
      const nextPreviewUrl = URL.createObjectURL(recordedBlob);

      setBlob(recordedBlob);
      setPreviewUrl(nextPreviewUrl);
      setStatus("preview");
      stopStream();
    };

    recorder.onerror = () => {
      setError("Recording failed");
      setStatus("error");
    };

    startedAtRef.current = Date.now();
    setElapsedMs(0);
    setStatus("recording");

    recorder.start(250);

    tickTimerRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current);
    }, 100);

    stopTimerRef.current = window.setTimeout(() => {
      stopRecording();
    }, maxDurationMs);
  }, [clearTimers, maxDurationMs, prepareCamera, resetPreview, stopRecording, stopStream]);

  const discardRecording = useCallback(async () => {
    clearTimers();
    recorderRef.current = null;
    resetPreview();
    stopStream();
    setError(null);
    setStatus("idle");
    await prepareCamera();
  }, [clearTimers, prepareCamera, resetPreview, stopStream]);

  const flipCamera = useCallback(async () => {
    if (status === "recording") {
      return;
    }

    const nextFacing = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextFacing);
    setError(null);
    setStatus("requesting");

    try {
      stopStream();
      resetPreview();

      const stream = await requestCameraStream(nextFacing);
      streamRef.current = stream;
      setLiveStream(stream);
      setStatus("ready");
    } catch (cause) {
      stopStream();
      const message =
        cause instanceof Error ? cause.message : "Camera flip failed";
      setError(message);
      setStatus("error");
    }
  }, [facingMode, resetPreview, status, stopStream]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) {
      return;
    }

    if (liveStream && (status === "requesting" || status === "ready" || status === "recording")) {
      node.src = "";
      node.srcObject = liveStream;
      node.muted = true;
      void node.play().catch((playError) => {
        const message =
          playError instanceof Error ? playError.message : "Video preview failed";
        setError(message);
      });
      return;
    }

    if (status === "preview" && previewUrl) {
      node.srcObject = null;
      node.src = previewUrl;
      node.muted = false;
      void node.play().catch(() => undefined);
    }
  }, [liveStream, previewUrl, status]);

  useEffect(() => {
    if (!autoPrepare || autoPrepareStartedRef.current) {
      return;
    }

    autoPrepareStartedRef.current = true;
    void prepareCamera();
  }, [autoPrepare, prepareCamera]);

  useEffect(() => {
    return () => {
      clearTimers();
      stopStream();
      setPreviewUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return null;
      });
    };
  }, [clearTimers, stopStream]);

  return {
    videoRef,
    status,
    error,
    elapsedMs,
    maxDurationMs,
    blob,
    previewUrl,
    mimeType,
    facingMode,
    prepareCamera,
    startRecording,
    stopRecording,
    discardRecording,
    flipCamera,
  };
}
