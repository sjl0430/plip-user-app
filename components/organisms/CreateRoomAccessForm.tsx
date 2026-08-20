"use client";

import { createAgitAction } from "@/actions/agitActions";
import { SubmitButton } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { AgreementRow } from "@/components/molecules/AgreementRow";
import { CREATE_ROOM_DRAFT_KEY, readCreateRoomDraft } from "@/lib/agit/createRoomDraft";
import { ROUTES } from "@/config/routes";
import {
  AGIT_NICKNAME_MAX_LENGTH,
  AGIT_NICKNAME_MIN_LENGTH,
} from "@/types/agit/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CreateRoomAccessForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!readCreateRoomDraft()) {
      router.replace(ROUTES.agit.create);
    }
  }, [router]);

  async function handleSubmit(formData: FormData) {
    if (!agreed || pending) {
      return;
    }

    const draft = readCreateRoomDraft();
    if (!draft) {
      router.replace(ROUTES.agit.create);
      return;
    }

    setError(null);
    setPending(true);

    const result = await createAgitAction({
      agitName: draft.title,
      description: draft.intro,
      maximumCapacity: draft.capacity,
      nickname: String(formData.get("nickname") ?? ""),
      thumbnailPath: draft.thumbnailPath,
    });

    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    sessionStorage.removeItem(CREATE_ROOM_DRAFT_KEY);
    router.push(ROUTES.agit.joined(result.data.id));
    router.refresh();
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
          <p className="dl-notice-card__body">아지트에서 사용할 프로필</p>
        </div>
        <button type="button" className="dl-profile-card__action">
          사진 변경
        </button>
      </div>

      <AuthField
        id="room-nickname"
        name="nickname"
        label="닉네임"
        hint={`영문·숫자·한글 ${AGIT_NICKNAME_MIN_LENGTH}~${AGIT_NICKNAME_MAX_LENGTH}자`}
        placeholder="보드왕"
        maxLength={AGIT_NICKNAME_MAX_LENGTH}
        pattern="[0-9A-Za-z가-힣]{2,12}"
        title="영문·숫자·한글 2~12자, 특수문자와 공백 불가"
        required
      />

      <AgreementRow
        id="create-guide"
        name="guide"
        label="커뮤니티 가이드와 신고 정책에 동의합니다"
        description="아지트별 프로필은 1개만 사용할 수 있어요"
        checked={agreed}
        onChange={setAgreed}
      />

      {error ? <p className="m-0 text-[12px] text-red-600">{error}</p> : null}

      <div className="dl-actions">
        <SubmitButton variant="brand" disabled={!agreed || pending}>
          {pending ? "만드는 중..." : "아지트 만들기"}
        </SubmitButton>
      </div>
    </form>
  );
}
