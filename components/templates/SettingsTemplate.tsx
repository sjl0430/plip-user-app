import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { AccountSecuritySection } from "@/components/organisms/AccountSecuritySection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function SettingsTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">P04 · ACCOUNT</p>
      <AuthTopBar title="계정 및 보안" backHref={ROUTES.mypage.root} />
      <h2 className="dl-title dl-title--section">계정 정보</h2>
      <AccountSecuritySection />
    </DailyLoopAuthTemplate>
  );
}
