import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { ProfileEditForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ProfileEditTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">P02 · EDIT PROFILE</p>
      <AuthTopBar title="기본 프로필 수정" backHref={ROUTES.mypage.root} />
      <h2 className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-[24px] leading-[35px] m-dlTitleSection">모든 방의 기본값</h2>
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">방 전용 프로필을 선택하지 않을 때 사용됩니다.</p>
      <ProfileEditForm />
    </DailyLoopAuthTemplate>
  );
}
