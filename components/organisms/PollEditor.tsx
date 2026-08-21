"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

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
        <div className="w-full rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[16px_14px] bg-[var(--dl-color-bg-brand-subtle)] m-dlPanelSubtle">
          <p className="m-0 text-[13px] font-semibold leading-[19px] text-[var(--dl-color-text-brand)]">투표 시작 전까지 질문과 선택지를 수정할 수 있어요.</p>
        </div>
      ) : (
        <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[var(--dl-color-bg-warning)] p-[12px_14px]">
          <DailyIcon name="alert" size={20} />
          <p className="m-0 text-[13px] font-medium leading-[19px] text-[var(--dl-color-text-primary)]">
            투표를 시작하면 질문과 선택지를 수정할 수 없어요.
          </p>
        </div>
      )}

      <div className="flex w-full flex-col gap-[6px]">
        <Label htmlFor="poll-question" className="m-0 text-[13px] font-medium leading-5 text-[var(--dl-color-text-primary)]">
          질문
        </Label>
        <Input
          id="poll-question"
          name="question"
          variant="daily"
          className={mode === "create" ? "border border-[var(--dl-color-border-brand)] m-dlInputBrand" : ""}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          required
        />
      </div>

      <div className="flex w-full [align-items:baseline] justify-between gap-[8px]">
        <p className="m-0 text-[13px] font-medium leading-5 text-[var(--dl-color-text-primary)]">{mode === "edit" ? "선택지 순서" : "선택지"}</p>
        {mode === "create" ? (
          <span className="text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">
            {choices.length} / {MAX_CHOICES}
          </span>
        ) : (
          <p className="m-0 text-xs font-normal leading-[17px] text-[var(--dl-color-text-tertiary)]">길게 눌러 순서 변경</p>
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

      <button type="button" className={`${leftoverStyles.dlAddChoice}`} disabled={!canAdd} onClick={addChoice}>
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
          <div className="flex w-full flex-col gap-[14px] mt-auto">
            <SubmitButton variant="brand">투표 시작하기</SubmitButton>
          </div>
        </>
      ) : (
        <>
          <div className="w-full rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[16px_14px]">
            <p className="m-0 text-[13px] font-semibold leading-[19px] text-[var(--dl-color-text-brand)]">채팅 미리보기</p>
            <p className="m-0 text-xs font-normal leading-[18px] text-[var(--dl-color-text-secondary)]">저장하면 채팅의 투표 카드에 즉시 반영됩니다.</p>
          </div>
          <div className="grid w-full grid-cols-[1fr_1fr] gap-[10px]">
            <button type="button" className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-danger)] !text-[var(--dl-color-text-danger)] shadow-[none] m-dlBtnDanger gap-2" onClick={goToChat}>
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
