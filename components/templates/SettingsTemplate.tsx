import { AuthTopBar } from "@/components/molecules";
import { AccountSecuritySection } from "@/components/organisms/AccountSecuritySection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function SettingsTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">P04 · ACCOUNT</p>
      <AuthTopBar title="계정 및 보안" backHref={ROUTES.mypage.root} />
      <h2 className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-[24px] leading-[35px] m-dlTitleSection">계정 정보</h2>
      <AccountSecuritySection />
    </DailyLoopAuthTemplate>
  );
}
