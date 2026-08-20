"use client";

import { SubmitButton } from "@/components/atoms";
import { AgreementRow } from "@/components/molecules/AgreementRow";
import { ROUTES } from "@/config/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateRoomAccessForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(true);

  function handleSubmit() {
    if (!agreed) return;
    router.push(ROUTES.agit.joined("azit-walk"));
  }

  return (
    <form className="flex w-full flex-col gap-3.5" action={handleSubmit}>
      <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">사진과 닉네임</p>

      <div className="dl-profile-card dl-profile-card--room">
        <div className="dl-profile-card__avatar">
          <Image src="/plip/v13/profile-avatar.svg" alt="" width={56} height={56} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="dl-notice-card__title">프로필 사진</p>
          <p className="dl-notice-card__body">안지민</p>
        </div>
        <button type="button" className="dl-profile-card__action">
          사진 변경
        </button>
      </div>

      <AgreementRow
        id="create-guide"
        name="guide"
        label="커뮤니티 가이드와 신고 정책에 동의합니다"
        description="아지트별 프로필은 1개만 사용할 수 있어요"
        checked={agreed}
        onChange={setAgreed}
      />

      <div className="dl-actions">
        <SubmitButton variant="brand" disabled={!agreed}>
          아지트 만들기
        </SubmitButton>
      </div>
    </form>
  );
}
