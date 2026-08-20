"use client";

import { SubmitButton } from "@/components/atoms";
import { MemberManageRow } from "@/components/molecules/MemberManageRow";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { useState } from "react";

const MEMBERS = [
  { id: "me", name: "안지민", meta: "방장 · 오늘 참여", host: true },
  { id: "min", name: "김민지", meta: "멤버 · 3분 전", host: false },
  { id: "jun", name: "박서준", meta: "멤버 · 1시간 전", host: false },
  { id: "ha", name: "윤하늘", meta: "멤버 · 어제", host: false },
] as const;

export function MembersPermissionsSection() {
  const [selectedId, setSelectedId] = useState<string>("ha");

  return (
    <section className="flex w-full flex-col gap-3.5">
      <NoticeCard tone="brand" title="새벽 기상 인증" body="남은 자리 1명" />

      {MEMBERS.map((member) => (
        <MemberManageRow
          key={member.id}
          name={member.name}
          meta={member.meta}
          host={member.host}
          selected={!member.host && member.id === selectedId}
          onSelect={member.host ? undefined : () => setSelectedId(member.id)}
        />
      ))}

      <NoticeCard
        tone="danger"
        title="추방 시 즉시 퇴장"
        body="선택한 사용자는 현재 아지트에 다시 참여해야 합니다."
      />

      <SubmitButton variant="danger" className="w-full">
        선택한 멤버 추방
      </SubmitButton>
    </section>
  );
}
