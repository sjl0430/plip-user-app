"use client";

import { DailyIcon, Input, Label, SubmitButton } from "@/components/atoms";
import { DailyToggle, PollChoiceRow, SettingsRow } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX_CHOICES = 5;
const MIN_CHOICES = 2;
const DEFAULT_QUESTION = "오늘 러닝 영상 태그는?";
const DEFAULT_CHOICES = [
  { id: "running", text: "러닝" },
  { id: "growth", text: "성장" },
  { id: "routine", text: "루틴" },
];

type PollEditorProps = {
  agitId: string;
  mode: "create" | "edit";
};

export function PollEditor({ agitId, mode }: PollEditorProps) {
  const router = useRouter();
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [choices, setChoices] = useState(DEFAULT_CHOICES);
  const [anonymous, setAnonymous] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const chatHref = ROUTES.agit.chat(agitId);
  const canAdd = choices.length < MAX_CHOICES;
  const canRemove = choices.length > MIN_CHOICES;

  function updateChoice(index: number, value: string) {
    setChoices((current) =>
      current.map((choice, i) => (i === index ? { ...choice, text: value } : choice)),
    );
  }

  function removeChoice(index: number) {
    if (!canRemove) return;
    setChoices((current) => current.filter((_, i) => i !== index));
  }

  function addChoice() {
    if (!canAdd) return;
    setChoices((current) => [...current, { id: crypto.randomUUID(), text: "" }]);
  }

  function moveChoice(from: number, to: number) {
    if (from === to) return;
    setChoices((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragIndex(to);
  }

  function goToChat() {
    router.push(chatHref);
  }

  return (
    <form
      className="flex w-full flex-col gap-3.5"
      onSubmit={(event) => {
        event.preventDefault();
        goToChat();
      }}
    >
      {mode === "create" ? (
        <div className="dl-panel dl-panel--subtle">
          <p className="dl-notice-title">투표 시작 전까지 질문과 선택지를 수정할 수 있어요.</p>
        </div>
      ) : (
        <div className="dl-warn">
          <DailyIcon name="alert" size={20} />
          <p className="m-0 text-[13px] font-medium leading-[19px] text-[var(--dl-color-text-primary)]">
            투표를 시작하면 질문과 선택지를 수정할 수 없어요.
          </p>
        </div>
      )}

      <div className="dl-field">
        <Label htmlFor="poll-question" className="dl-field__label">
          질문
        </Label>
        <Input
          id="poll-question"
          name="question"
          variant="daily"
          className={mode === "create" ? "dl-input--brand" : ""}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          required
        />
      </div>

      <div className="dl-choice-head">
        <p className="dl-field__label">{mode === "edit" ? "선택지 순서" : "선택지"}</p>
        {mode === "create" ? (
          <span className="dl-count">
            {choices.length} / {MAX_CHOICES}
          </span>
        ) : (
          <p className="dl-choice-head__hint">길게 눌러 순서 변경</p>
        )}
      </div>

      {choices.map((choice, index) => (
        <PollChoiceRow
          key={choice.id}
          value={choice.text}
          variant={mode}
          onChange={(value) => updateChoice(index, value)}
          onRemove={canRemove ? () => removeChoice(index) : undefined}
          draggable={mode === "edit"}
          onDragStart={() => setDragIndex(index)}
          onDragOver={() => {
            if (dragIndex === null) return;
            moveChoice(dragIndex, index);
          }}
          onDragEnd={() => setDragIndex(null)}
        />
      ))}

      <button type="button" className="dl-add-choice" disabled={!canAdd} onClick={addChoice}>
        <DailyIcon name="plus" size={18} />
        선택지 추가
      </button>

      {mode === "create" ? (
        <>
          <SettingsRow
            title="익명 투표"
            description="참여자 이름을 공개하지 않아요"
            trailing={
              <DailyToggle checked={anonymous} label="익명 투표" onChange={setAnonymous} />
            }
          />
          <SettingsRow title="마감" description="오늘 오후 11:59" showChevron />
          <div className="dl-actions">
            <SubmitButton variant="brand">투표 시작하기</SubmitButton>
          </div>
        </>
      ) : (
        <>
          <div className="dl-panel">
            <p className="dl-notice-title">채팅 미리보기</p>
            <p className="dl-notice-body">저장하면 채팅의 투표 카드에 즉시 반영됩니다.</p>
          </div>
          <div className="dl-pair">
            <button type="button" className="dl-btn dl-btn--danger gap-2" onClick={goToChat}>
              <DailyIcon name="trash" size={18} />
              초안 삭제
            </button>
            <SubmitButton variant="brand">수정사항 저장</SubmitButton>
          </div>
        </>
      )}
    </form>
  );
}
