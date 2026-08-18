import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { ProfileEditForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ProfileEditTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">P02 · EDIT PROFILE</p>
      <AuthTopBar title="기본 프로필 수정" backHref={ROUTES.mypage.root} />
      <h2 className="dl-title dl-title--section">모든 방의 기본값</h2>
      <p className="dl-subtitle">방 전용 프로필을 선택하지 않을 때 사용됩니다.</p>
      <ProfileEditForm />
    </DailyLoopAuthTemplate>
  );
}
