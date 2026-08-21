"use client";

import { SubmitButton } from "@/components/atoms";
import { ProfileOption } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PROFILES = [
  {
    id: "daily-runner",
    title: "데일리러너",
    description: "기본 프로필 · 작은 기록을 꾸준히 남겨요",
  },
  {
    id: "hangang-walker",
    title: "한강워커",
    description: "이전에 만든 방 전용 프로필",
  },
] as const;

type RoomProfileSelectProps = {
  agitId: string;
};

export function RoomProfileSelect({ agitId }: RoomProfileSelectProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(PROFILES[0].id);

  function handleSubmit() {
    router.push(ROUTES.agit.joined(agitId));
  }

  return (
    <form className="flex w-full flex-col gap-3.5" action={handleSubmit}>
      {PROFILES.map((profile) => (
        <ProfileOption
          key={profile.id}
          title={profile.title}
          description={profile.description}
          icon={selectedId === profile.id ? "circleDot" : "circle"}
          selected={selectedId === profile.id}
          onClick={() => setSelectedId(profile.id)}
        />
      ))}

      <ProfileOption
        title="새 방 전용 프로필 만들기"
        description="이 방에서만 보이는 이름과 소개"
        icon="plus"
        ghost
        onClick={() => setSelectedId("new")}
      />

      <div className="w-full rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[16px_14px]">
        <p className="m-0 text-[13px] font-semibold leading-[19px] text-[var(--dl-color-text-primary)]">
          친구 추가 기능은 제공하지 않아요
        </p>
        <p className="m-0 text-xs font-normal leading-[18px] text-[var(--dl-color-text-secondary)] mt-1.5">
          프로필은 방 안에서 작성자를 구분하기 위해 사용합니다.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[14px] mt-auto">
        <SubmitButton variant="brand">이 프로필로 참여</SubmitButton>
      </div>
    </form>
  );
}
