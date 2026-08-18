"use client";

import { useVideoRecorder } from "@/hooks/useVideoRecorder";
import { DEFAULT_CAPTURE_CAPTION } from "@/lib/video/constants";
import { runPhase0FUpload, type Phase0FUploadResult } from "@/lib/video/uploadPipeline";
import type { CaptureFlowPhase } from "@/types/video/ui";
import { useCallback, useMemo, useState } from "react";

function mapRecorderStatusToFlowPhase(
  recorderStatus: ReturnType<typeof useVideoRecorder>["status"],
  uploading: boolean,
  uploadResult: Phase0FUploadResult | null,
  flowError: string | null,
): CaptureFlowPhase {
  if (flowError) {
    return "error";
  }

  if (uploadResult) {
    return "complete";
  }

  if (uploading) {
    return "uploading";
  }

  switch (recorderStatus) {
    case "requesting":
      return "initializing";
    case "ready":
      return "ready";
    case "recording":
      return "recording";
    case "preview":
      return "preview";
    case "error":
      return "error";
    default:
      return "initializing";
  }
}

export function useVideoCaptureFlow() {
  const recorder = useVideoRecorder({ autoPrepare: true });
  const [uploading, setUploading] = useState(false);
  const [flowError, setFlowError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<Phase0FUploadResult | null>(null);

  const effectiveError = flowError ?? recorder.error;

  const flowPhase = useMemo(
    () =>
      mapRecorderStatusToFlowPhase(
        recorder.status,
        uploading,
        uploadResult,
        effectiveError,
      ),
    [recorder.status, uploading, uploadResult, effectiveError],
  );

  const resetFlow = useCallback(() => {
    setFlowError(null);
    setUploadResult(null);
    setUploading(false);
  }, []);

  const retake = useCallback(async () => {
    resetFlow();
    await recorder.discardRecording();
  }, [recorder, resetFlow]);

  const uploadCapture = useCallback(
    async (caption = DEFAULT_CAPTURE_CAPTION) => {
      if (!recorder.blob) {
        setFlowError("Recorded blob is missing");
        return null;
      }

      setUploading(true);
      setFlowError(null);
      setUploadResult(null);

      try {
        const result = await runPhase0FUpload(recorder.blob, {
          caption,
          recorderMimeType: recorder.mimeType,
          localPreviewUrl: recorder.previewUrl,
        });

        setUploadResult(result);
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        setFlowError(message);
        return null;
      } finally {
        setUploading(false);
      }
    },
    [recorder.blob, recorder.mimeType, recorder.previewUrl],
  );

  return {
    ...recorder,
    flowPhase,
    flowError: effectiveError,
    uploadResult,
    uploading,
    retake,
    uploadCapture,
    resetFlow,
  };
}
