"use client";

import { DailyIcon, SubmitButton } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
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
        className={`dl-sheet-scrim ${visible ? "dl-sheet-scrim--open" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`dl-sheet dl-sheet--tall ${visible ? "dl-sheet--open" : ""}`}
        role="dialog"
        aria-modal
        aria-labelledby="move-topic-title"
        aria-hidden={!visible}
      >
        <div className="dl-sheet__header">
          <div>
            <h2 id="move-topic-title" className="m-0 text-[24px] font-bold text-[var(--dl-color-text-primary)]">
              토픽 이동
            </h2>
            <p className="m-0 mt-1 text-[11px] text-[var(--dl-color-text-brand)]">
              현재 영상의 토픽을 변경합니다
            </p>
          </div>
          <button type="button" className="dl-icon-sq" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <div className="dl-topic-summary">
          <p className="dl-topic-summary__meta">8월 14일 · 00:05</p>
          <p className="dl-topic-summary__title">새벽 러닝 완료</p>
          <p className="dl-topic-summary__current">현재&nbsp;&nbsp;#7시_러닝_인증</p>
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
                "dl-topic-option",
                selected ? "dl-topic-option--selected" : "",
                disabled ? "dl-topic-option--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelectedId(topic.id)}
            >
              <span className="min-w-0 flex-1 text-left">
                <p className="dl-topic-option__label">{topic.label}</p>
                <p className={`dl-topic-option__meta${disabled ? " dl-topic-option__meta--danger" : ""}`}>
                  {topic.meta}
                </p>
              </span>
              {selected ? <span className="dl-topic-option__check">✓</span> : null}
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
