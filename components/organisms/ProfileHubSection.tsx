"use client";

import { SubmitButton, TextLink } from "@/components/atoms";
import { NotificationIconToggle } from "@/components/molecules/NotificationIconToggle";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useState } from "react";

export function ProfileHubSection() {
  const [notify, setNotify] = useState(true);

  return (
    <section className="flex w-full flex-col gap-3.5" aria-label="설정">
      <h1 className="dl-settings-head m-0">설정</h1>

      <TextLink href={ROUTES.mypage.profile} className="dl-settings-profile no-underline">
        <div className="dl-settings-profile__avatar">
          <Image src="/plip/v13/profile-avatar.svg" alt="" width={64} height={64} />
        </div>
        <p className="dl-settings-profile__name">
          안지민
          <br />
          기본 프로필 관리
        </p>
      </TextLink>

      <SettingsRow
        title="알림 설정"
        description="채팅과 업로드 알림을 따로 관리"
        trailing={
          <NotificationIconToggle checked={notify} label="알림" onChange={setNotify} />
        }
        showChevron={false}
      />
      <SettingsRow href={ROUTES.shop.points} title="포인트" description="보유 1,240 P" />
      <SettingsRow href={ROUTES.shop.root} title="상점" description="방 인원 확장·꾸미기 아이템" />
      <SettingsRow href={ROUTES.shop.myItems} title="내 다운로드" description="저장한 내 영상 관리" />
      <SettingsRow href={ROUTES.mypage.settings} title="도움말·약관" description="신고·개인정보·서비스 정책" />

      <SubmitButton variant="outline" className="w-full">
        로그아웃
      </SubmitButton>
      <TextLink href={ROUTES.mypage.settings} className="dl-settings-delete">
        계정 삭제
      </TextLink>
    </section>
  );
}
