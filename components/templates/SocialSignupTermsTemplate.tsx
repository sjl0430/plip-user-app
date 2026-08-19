import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";

export function SocialSignupTermsTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.login} />
      <h2 className="dl-title">약관 동의</h2>
      <p className="dl-subtitle">소셜 계정 가입을 위해 약관 동의가 필요합니다.</p>
    </DailyLoopAuthTemplate>
  );
}
