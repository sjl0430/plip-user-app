"use client";

import { DailyIcon, SubmitButton } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { cn } from "@/lib/utils";
import { useState } from "react";

const TOPICS = [
  { id: "diet", label: "#아침_식단", meta: "영상 없음 · 이동 가능", available: true },
  { id: "read", label: "#독서_10분", meta: "이미 내 영상이 있음", available: false },
  { id: "goal", label: "#오늘의_목표", meta: "영상 없음 · 이동 가능", available: true },
] as const;

type MoveTopicSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MoveTopicSheet({ open, onClose }: MoveTopicSheetProps) {
  const { mounted, visible } = useOverlayTransition(open);
  const [selectedId, setSelectedId] = useState<string>("diet");

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-[41] border-0 bg-[rgba(23,23,28,0.4)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[42] flex max-h-[78dvh] flex-col gap-3 overflow-auto rounded-t-[28px] bg-[#fbfaff] px-6 pt-6 pb-8 [transition:transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          visible ? "[transform:translateY(0)]" : "[transform:translateY(100%)]",
        )}
        role="dialog"
        aria-modal
        aria-labelledby="move-topic-title"
        aria-hidden={!visible}
      >
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <h2 id="move-topic-title" className="m-0 text-[24px] font-bold text-[var(--dl-color-text-primary)]">
              토픽 이동
            </h2>
            <p className="m-0 mt-1 text-[11px] text-[var(--dl-color-text-brand)]">
              현재 영상의 토픽을 변경합니다
            </p>
          </div>
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-[4px] p-[14px] rounded-[14px] bg-[var(--dl-color-bg-brand-subtle)]">
          <p className="m-0 text-xs text-[var(--dl-color-text-secondary)]">8월 14일 · 00:05</p>
          <p className="m-0 text-[15px] font-semibold text-[var(--dl-color-text-primary)]">새벽 러닝 완료</p>
          <p className="m-0 text-[11px] text-[var(--dl-color-text-brand)]">현재&nbsp;&nbsp;#7시_러닝_인증</p>
        </div>

        <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">이동할 토픽</p>

        {TOPICS.map((topic) => {
          const selected = topic.id === selectedId;
          const disabled = !topic.available;

          return (
            <button
              key={topic.id}
              type="button"
              disabled={disabled}
              className={[
                "flex items-center gap-[8px] w-full min-h-[66px] p-[11px_13px] border border-[var(--dl-color-border-default)] rounded-[12px] bg-[var(--dl-color-bg-elevated)] cursor-pointer text-left",
                selected ? "border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-brand-subtle)] m-dlTopicOptionSelected" : "",
                disabled ? "opacity-[0.92] [cursor:not-allowed] m-dlTopicOptionDisabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelectedId(topic.id)}
            >
              <span className="min-w-0 flex-1 text-left">
                <p className="m-0 text-sm font-semibold text-[var(--dl-color-text-primary)] text-[var(--dl-color-text-brand)]">{topic.label}</p>
                <p className={`m-[4px_0_0] text-[11px] text-[var(--dl-color-text-secondary)]${disabled ? " text-[var(--dl-color-text-danger)] m-dlTopicOptionMetaDanger" : ""}`}>
                  {topic.meta}
                </p>
              </span>
              {selected ? <span className="text-lg font-bold text-[var(--dl-color-text-brand)]">✓</span> : null}
            </button>
          );
        })}

        <SubmitButton variant="brand" className="mt-2 w-full" onClick={onClose}>
          선택한 토픽으로 이동
        </SubmitButton>
      </div>
    </>
  );
}
