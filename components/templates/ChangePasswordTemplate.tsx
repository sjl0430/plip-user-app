import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { ChangePasswordForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ChangePasswordTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">P04 · PASSWORD</p>
      <AuthTopBar title="비밀번호 변경" backHref={ROUTES.mypage.settings} />
      <h2 className="dl-title dl-title--section">비밀번호를 변경하세요</h2>
      <p className="dl-subtitle">마지막 변경 30일 전</p>
      <ChangePasswordForm />
    </DailyLoopAuthTemplate>
  );
}
