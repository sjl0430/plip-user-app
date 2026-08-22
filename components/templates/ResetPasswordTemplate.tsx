import { ResetPasswordForm } from "@/components/organisms";
import { AuthTopBar } from "@/components/molecules";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ResetPasswordTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.forgotPassword} />
      <ResetPasswordForm />
    </DailyLoopAuthTemplate>
  );
}
