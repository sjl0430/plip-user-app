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
  azitId: string;
};

export function RoomUploadSection({ azitId }: RoomUploadSectionProps) {
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
      <header className="dl-hub-head">
        <h1 className="dl-hub-head__title">영상 올리기</h1>
        <TextLink href={ROUTES.azit.detail(azitId)} className="text-[14px] font-medium text-[var(--dl-color-text-secondary)] no-underline">
          닫기
        </TextLink>
      </header>

      <button
        type="button"
        className={`dl-dropzone ${fileName ? "dl-dropzone--ready" : ""}`}
        onClick={() => fileRef.current?.click()}
      >
        <span className="dl-dropzone__icon">
          <DailyIcon name="upload" size={24} />
        </span>
        <p className="dl-dropzone__title">{fileName || "영상 선택 또는 촬영"}</p>
        <p className="dl-dropzone__desc">최대 60초 · 내 영상은 다운로드 가능</p>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="dl-section-row">
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

      <div className="dl-warn">
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
        onClick={() => router.push(ROUTES.azit.detail(azitId))}
      >
        업로드
      </SubmitButton>
    </section>
  );
}
