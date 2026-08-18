"use client";

import { SubmitButton, TextLink } from "@/components/atoms";
import { DailyToggle } from "@/components/molecules/DailyToggle";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useState } from "react";

export function ProfileHubSection() {
  const [notify, setNotify] = useState(true);

  return (
    <section className="flex w-full flex-col gap-3.5">
      <h1 className="dl-page-head__title">설정</h1>
      <TextLink href={ROUTES.mypage.profile} className="dl-profile-card no-underline">
        <div className="dl-avatar size-16 overflow-hidden rounded-full">
          <Image src="/plip/daily-loop/profile-hub.png" alt="" width={64} height={64} />
        </div>
        <p className="m-0 text-[16px] font-semibold leading-5 text-[var(--dl-color-text-primary)]">
          안지민
          <br />
          기본 프로필 관리
        </p>
      </TextLink>

      <SettingsRow
        title="알림 설정"
        description="채팅과 업로드 알림을 따로 관리"
        trailing={<DailyToggle checked={notify} label="알림" onChange={setNotify} />}
        showChevron={false}
      />
      <SettingsRow href={ROUTES.shop.points} title="포인트" description="보유 1,240 P" />
      <SettingsRow href={ROUTES.shop.root} title="상점" description="방 인원 확장·꾸미기 아이템" />
      <SettingsRow href={ROUTES.shop.myItems} title="내 다운로드" description="저장한 내 영상 관리" />
      <SettingsRow href={ROUTES.mypage.settings} title="도움말·약관" description="신고·개인정보·서비스 정책" />

      <SubmitButton variant="outline">로그아웃</SubmitButton>
      <TextLink href={ROUTES.mypage.settings} className="text-center text-[12px] text-[var(--dl-color-text-tertiary)]">
        계정 삭제
      </TextLink>
    </section>
  );
}
