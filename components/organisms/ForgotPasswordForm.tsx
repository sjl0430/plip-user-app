import { SubmitButton } from "@/components/atoms";
import { EmailWithOtpAction } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function ForgotPasswordForm() {
  return (
    <form
      className="flex w-full flex-col gap-6"
      action={ROUTES.resetPassword}
      method="get"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        회원가입과 동일한 이메일 OTP 인증 후 비밀번호 재설정 페이지로 이동합니다.
      </p>

      <EmailWithOtpAction />

      <SubmitButton>인증 완료 후 재설정</SubmitButton>
    </form>
  );
}
