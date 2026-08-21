import { DailyIcon, SubmitButton } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

export function ProfileEditForm() {
  return (
    <form className="flex w-full flex-col gap-3.5" action={ROUTES.mypage.root} method="get">
      <div className="flex items-center gap-3.5">
        <div className="relative overflow-hidden rounded-[38px] w-[76px] h-[76px] shrink-0 [&_img]:w-full [&_img]:h-full [&_img]:object-cover w-[88px] h-[88px] rounded-[44px] m-dlAvatarLg">
          <Image src="/plip/daily-loop/profile-hub.png" alt="" width={88} height={88} />
        </div>
        <button type="button" className="inline-flex h-[44px] items-center gap-[8px] border-0 bg-[transparent] p-[12px_0] text-sm font-medium leading-5 text-[var(--dl-color-text-brand)]">
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

      <div className="w-full rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[16px_14px]">
        <p className="m-0 text-[13px] font-semibold leading-[19px] text-[var(--dl-color-text-primary)]">
          기존 방에는 자동 반영되지 않아요
        </p>
        <p className="m-0 text-xs font-normal leading-[18px] text-[var(--dl-color-text-secondary)] mt-1.5">
          이미 방 전용 프로필을 사용 중인 방은 해당 프로필을 유지합니다.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[14px] mt-auto">
        <SubmitButton variant="brand">변경사항 저장</SubmitButton>
      </div>
    </form>
  );
}
