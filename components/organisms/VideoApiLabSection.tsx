"use client";

import { ROUTES } from "@/config/routes";
import {
  completeVideoAction,
  getDownloadUrlAction,
  getVideoAction,
  issueUploadUrlAction,
} from "@/actions/videoActions";
import {
  extractActionError,
  extractVideoUuidFromActionResult,
} from "@/lib/video/actionPayload";
import { useState } from "react";

type LogEntry = {
  id: number;
  label: string;
  payload: unknown;
};

type StatusMessage = {
  kind: "success" | "error";
  text: string;
};

export function VideoApiLabSection() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [videoUuid, setVideoUuid] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  function appendLog(label: string, payload: unknown) {
    setLogs((prev) => [{ id: Date.now(), label, payload }, ...prev].slice(0, 10));
  }

  function applyActionResult(label: string, payload: unknown) {
    appendLog(label, payload);

    const nextVideoUuid = extractVideoUuidFromActionResult(payload);
    if (nextVideoUuid) {
      setVideoUuid(nextVideoUuid);
    }

    const error = extractActionError(payload);
    if (error) {
      setStatus({ kind: "error", text: error });
      return;
    }

    if (nextVideoUuid && label === "issueUploadUrlAction") {
      setStatus({ kind: "success", text: `videoUuid 입력됨: ${nextVideoUuid}` });
      return;
    }

    setStatus({ kind: "success", text: `${label} 성공` });
  }

  async function run(label: string, task: () => Promise<unknown>) {
    setBusy(true);
    setStatus(null);

    try {
      const result = await task();
      applyActionResult(label, result);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      applyActionResult(label, { ok: false, error: message });
      return { ok: false as const, error: message };
    } finally {
      setBusy(false);
    }
  }

  async function handleIssueUploadUrl() {
    await run("issueUploadUrlAction", () => issueUploadUrlAction("video/mp4"));
  }

  async function handleComplete() {
    if (!videoUuid.trim()) {
      applyActionResult("completeVideoAction", {
        ok: false,
        error: "videoUuid가 비어 있습니다. 1. upload-url을 먼저 실행하세요.",
      });
      return;
    }

    await run("completeVideoAction", () =>
      completeVideoAction(videoUuid.trim(), "Phase 0-F lab caption"),
    );
  }

  async function handleGetVideo() {
    if (!videoUuid.trim()) {
      applyActionResult("getVideoAction", {
        ok: false,
        error: "videoUuid가 비어 있습니다.",
      });
      return;
    }

    await run("getVideoAction", () => getVideoAction(videoUuid.trim()));
  }

  async function handleGetDownloadUrl() {
    if (!videoUuid.trim()) {
      applyActionResult("getDownloadUrlAction", {
        ok: false,
        error: "videoUuid가 비어 있습니다.",
      });
      return;
    }

    await run("getDownloadUrlAction", () => getDownloadUrlAction(videoUuid.trim()));
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6 font-mono text-sm">
      <header>
        <h1 className="text-lg font-semibold">Video API Lab (Step 1–3)</h1>
        <p className="text-black/60">
          Server Actions → videoService → videoApi → plip-video (:8085)
        </p>
        <p className="text-xs text-black/50">
          촬영 Phase 0-F (Step 4 PR):{" "}
          <a href={ROUTES.capture.video} className="underline">
            {ROUTES.capture.video}
          </a>
        </p>
      </header>

      {status ? (
        <p
          className={`rounded px-3 py-2 text-xs ${
            status.kind === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"
          }`}
          role="status"
        >
          {status.text}
        </p>
      ) : null}

      <label className="flex flex-col gap-1">
        <span>videoUuid</span>
        <input
          className="rounded border px-3 py-2"
          value={videoUuid}
          onChange={(event) => setVideoUuid(event.target.value)}
          placeholder="1. upload-url 클릭 시 자동 입력"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
          disabled={busy}
          onClick={handleIssueUploadUrl}
        >
          1. upload-url
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={busy}
          onClick={handleComplete}
        >
          2. complete (NoOp PUT 생략)
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={busy}
          onClick={handleGetVideo}
        >
          3. GET detail
        </button>
        <button
          type="button"
          className="rounded border px-3 py-2 disabled:opacity-50"
          disabled={busy}
          onClick={handleGetDownloadUrl}
        >
          4. GET download-url
        </button>
      </div>

      <p className="text-xs text-black/50">
        순서: 1 → 2 → 3 → 4. 2번(complete) 전에 3·4번을 누르면 404/202만 나올 수 있습니다.
      </p>

      <ol className="list-decimal space-y-2 pl-5 text-black/70">
        {logs.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.label}</strong>
            <pre className="mt-1 overflow-x-auto rounded bg-black/5 p-2 text-xs">
              {JSON.stringify(entry.payload, null, 2)}
            </pre>
          </li>
        ))}
      </ol>
    </section>
  );
}
