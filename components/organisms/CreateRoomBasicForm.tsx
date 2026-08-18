"use client";

import { SubmitButton } from "@/components/atoms";
import { AuthField, CapacityStepper } from "@/components/molecules";
import { ThumbnailUpload } from "@/components/molecules/ThumbnailUpload";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CREATE_ROOM_DRAFT_KEY = "plip-create-room";

export type CreateRoomDraft = {
  title: string;
  intro: string;
  category: string;
  capacity: number;
};

export function CreateRoomBasicForm() {
  const router = useRouter();
  const [capacity, setCapacity] = useState(5);

  function handleSubmit(formData: FormData) {
    const draft: CreateRoomDraft = {
      title: String(formData.get("title") ?? ""),
      intro: String(formData.get("intro") ?? ""),
      category: "루틴",
      capacity,
    };
    sessionStorage.setItem(CREATE_ROOM_DRAFT_KEY, JSON.stringify(draft));
    router.push(ROUTES.azit.createSettings);
  }

  return (
    <form className="flex w-full flex-col gap-3.5" action={handleSubmit}>
      <ThumbnailUpload />
      <AuthField
        id="room-title"
        name="title"
        label="아지트 제목"
        hint="최대 24자"
        placeholder="새벽 기상 인증"
        defaultValue="새벽 기상 인증"
        maxLength={24}
        required
      />
      <AuthField
        id="room-intro"
        name="intro"
        label="소개글"
        hint="최대 120자"
        placeholder="함께 아침 루틴을 기록해요"
        defaultValue="함께 아침 루틴을 기록해요"
        maxLength={120}
        required
      />
      <div className="dl-notice-card">
        <p className="dl-notice-card__title">최대 인원</p>
        <p className="dl-notice-card__body">기본 5명 · 최대 20명</p>
        <CapacityStepper value={capacity} min={2} max={20} onChange={setCapacity} />
      </div>
      <p className="m-0 text-[12px] text-[var(--dl-color-text-tertiary)]">
        기본 정원 5명 · 최대 20명까지 설정할 수 있어요.
      </p>
      <div className="dl-actions">
        <SubmitButton variant="brand">다음</SubmitButton>
      </div>
    </form>
  );
}
