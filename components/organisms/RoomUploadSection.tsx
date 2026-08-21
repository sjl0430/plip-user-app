"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { AgreementRow, TopicOption } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const TOPICS = [
  { id: "morning-run", label: "아침 러닝", available: true },
  { id: "diet", label: "식단", available: false },
  { id: "stretch", label: "스트레칭", available: true },
] as const;

type RoomUploadSectionProps = {
  agitId: string;
};

export function RoomUploadSection({ agitId }: RoomUploadSectionProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [topicId, setTopicId] = useState("morning-run");
  const [agreed, setAgreed] = useState(true);

  function handleFile(file?: File) {
    if (!file) return;
    setFileName(file.name);
  }

  return (
    <section className="flex w-full flex-col gap-3.5" aria-label="영상 올리기">
      <header className="flex w-full items-center justify-between gap-[12px]">
        <h1 className="m-0 text-[22px] font-semibold leading-[31px] text-[var(--dl-color-text-primary)]">영상 올리기</h1>
        <TextLink href={ROUTES.agit.detail(agitId)} className="text-[14px] font-medium text-[var(--dl-color-text-secondary)] no-underline">
          닫기
        </TextLink>
      </header>

      <button
        type="button"
        className={`flex w-full min-h-[240px] flex-col items-center justify-center gap-[10px] border border-[var(--dl-color-border-brand)] rounded-[20px] bg-[var(--dl-color-bg-brand-subtle)] ${fileName ? "[border-style:dashed] m-dlDropzoneReady" : ""}`}
        onClick={() => fileRef.current?.click()}
      >
        <span className="grid w-[48px] h-[56px] place-items-center rounded-[28px] bg-[var(--dl-color-bg-elevated)]">
          <DailyIcon name="upload" size={24} />
        </span>
        <p className="m-0 text-base font-semibold leading-[23px] text-[var(--dl-color-text-primary)]">{fileName || "영상 선택 또는 촬영"}</p>
        <p className="m-0 text-xs leading-[17px] text-[var(--dl-color-text-secondary)]">최대 60초 · 내 영상은 다운로드 가능</p>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="flex w-full items-center justify-between gap-[8px]">
        <p className="m-0 text-[15px] font-semibold leading-[21px] text-[var(--dl-color-text-primary)]">
          토픽 선택
        </p>
        <p className="m-0 text-[12px] font-medium text-[var(--dl-color-text-brand)]">1인 1영상</p>
      </div>

      {TOPICS.map((topic) => (
        <TopicOption
          key={topic.id}
          label={topic.label}
          available={topic.available}
          selected={topicId === topic.id}
          onSelect={() => {
            if (topic.available) setTopicId(topic.id);
          }}
        />
      ))}

      <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[var(--dl-color-bg-warning)] p-[12px_14px]">
        <DailyIcon name="alert" size={18} />
        <p className="m-0 text-[12px] leading-[17px] text-[var(--dl-color-text-secondary)]">
          이미 등록한 토픽은 선택할 수 없어요.
          <br />
          업로드 후 다른 토픽으로 이동할 수 있습니다.
        </p>
      </div>

      <AgreementRow
        id="room-upload-rules"
        name="rules"
        label="방의 목적과 이용 규칙을 확인했습니다."
        checked={agreed}
        onChange={setAgreed}
      />

      <SubmitButton
        variant="brand"
        disabled={!agreed}
        onClick={() => router.push(ROUTES.agit.detail(agitId))}
      >
        업로드
      </SubmitButton>
    </section>
  );
}
