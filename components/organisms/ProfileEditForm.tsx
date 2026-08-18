import { DailyIcon, SubmitButton } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

export function ProfileEditForm() {
  return (
    <form className="flex w-full flex-col gap-3.5" action={ROUTES.mypage.root} method="get">
      <div className="flex items-center gap-3.5">
        <div className="dl-avatar dl-avatar--lg">
          <Image src="/plip/daily-loop/profile-hub.png" alt="" width={88} height={88} />
        </div>
        <button type="button" className="dl-photo-change">
          <DailyIcon name="camera" size={20} />
          사진 변경
        </button>
      </div>

      <AuthField
        id="profile-nickname"
        name="nickname"
        label="닉네임"
        hint="2–12자"
        defaultValue="데일리러너"
        maxLength={12}
        required
      />
      <AuthField
        id="profile-bio"
        name="bio"
        label="한 줄 소개"
        hint="최대 40자"
        defaultValue="작은 기록을 꾸준히 남겨요"
        maxLength={40}
      />

      <div className="dl-panel">
        <p className="m-0 text-[13px] font-semibold leading-[19px] text-[var(--dl-color-text-primary)]">
          기존 방에는 자동 반영되지 않아요
        </p>
        <p className="dl-notice-body mt-1.5">
          이미 방 전용 프로필을 사용 중인 방은 해당 프로필을 유지합니다.
        </p>
      </div>

      <div className="dl-actions">
        <SubmitButton variant="brand">변경사항 저장</SubmitButton>
      </div>
    </form>
  );
}
