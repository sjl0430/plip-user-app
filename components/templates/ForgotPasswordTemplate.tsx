import { ForgotPasswordForm } from "@/components/organisms";
import { AuthTopBar } from "@/components/molecules";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ForgotPasswordTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.login} />
      <ForgotPasswordForm />
    </DailyLoopAuthTemplate>
  );
}
