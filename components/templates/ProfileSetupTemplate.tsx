import { ui } from "@/components/atoms/styles";
import { AuthTopBar } from "@/components/molecules";
import { ProfileSetupForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ProfileSetupTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.signup} />
      <h2 className={ui.title}>유저 프로필 만들기</h2>
      <p className={ui.subtitle}>가입 후 모든 아지트에서 선택할 기본 유저 프로필입니다.</p>
      <ProfileSetupForm />
    </DailyLoopAuthTemplate>
  );
}
