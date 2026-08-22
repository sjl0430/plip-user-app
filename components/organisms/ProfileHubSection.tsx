"use client";

import { logoutAction } from "@/actions/authActions";
import { SubmitButton, TextLink } from "@/components/atoms";
import { NotificationIconToggle } from "@/components/molecules/NotificationIconToggle";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { toast } from "@/components/ui/toast";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileHubSection() {
  const router = useRouter();
  const [notify, setNotify] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    const result = await logoutAction();
    if (!result.ok) {
      toast.add({
        type: "error",
        title: "로그아웃에 실패했습니다",
        description: result.error,
      });
      setLoggingOut(false);
      return;
    }
    router.push(ROUTES.login);
    router.refresh();
  }

  return (
    <section className="flex w-full flex-col gap-3.5" aria-label="설정">
      <h1 className="text-[26px] font-bold text-[var(--dl-color-text-primary)] m-0">
        설정
      </h1>

      <TextLink
        href={ROUTES.mypage.profile}
        className="flex items-center gap-[12px] min-h-[100px] p-[14px] rounded-[18px] bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-primary)] no-underline"
      >
        <div className="w-[64px] h-[64px] overflow-hidden rounded-[999px] shrink-0">
          <Image
            src="/plip/v13/profile-avatar.svg"
            alt=""
            width={64}
            height={64}
          />
        </div>
        <p className="m-0 text-[15px] font-semibold leading-[1.35]">
          안지민
          <br />
          기본 프로필 관리
        </p>
      </TextLink>

      <SettingsRow
        title="알림 설정"
        description="채팅과 업로드 알림을 따로 관리"
        trailing={
          <NotificationIconToggle
            checked={notify}
            label="알림"
            onChange={setNotify}
          />
        }
        showChevron={false}
      />
      <SettingsRow
        href={ROUTES.shop.points}
        title="포인트"
        description="보유 1,240 P"
      />
      <SettingsRow
        href={ROUTES.shop.root}
        title="상점"
        description="방 인원 확장·꾸미기 아이템"
      />
      <SettingsRow
        href={ROUTES.shop.myItems}
        title="내 다운로드"
        description="저장한 내 영상 관리"
      />
      <SettingsRow
        href={ROUTES.mypage.settings}
        title="도움말·약관"
        description="신고·개인정보·서비스 정책"
      />

      <SubmitButton
        type="button"
        variant="outline"
        className="w-full"
        disabled={loggingOut}
        onClick={handleLogout}
      >
        로그아웃
      </SubmitButton>
      <TextLink
        href={ROUTES.mypage.settings}
        className="block text-center text-xs font-medium !text-[var(--dl-color-text-danger)] !no-underline"
      >
        계정 삭제
      </TextLink>
    </section>
  );
}
