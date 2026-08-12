import { ResetPasswordForm } from "@/components/organisms";
import { PageHeader } from "@/components/molecules";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export function ResetPasswordTemplate() {
  return (
    <AuthTemplate>
      <PageHeader title="비밀번호 재설정" />
      <ResetPasswordForm />
    </AuthTemplate>
  );
}
