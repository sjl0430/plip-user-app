import { SubmitButton } from "@/components/atoms";
import { FormField, PasswordInput } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function ResetPasswordForm() {
  return (
    <form
      className="flex w-full flex-col gap-6"
      action={ROUTES.login}
      method="get"
    >
      <FormField label="새 비밀번호" htmlFor="reset-password">
        <PasswordInput
          id="reset-password"
          name="password"
          autoComplete="new-password"
          required
        />
      </FormField>

      <FormField label="새 비밀번호 확인" htmlFor="reset-password-confirm">
        <PasswordInput
          id="reset-password-confirm"
          name="passwordConfirm"
          autoComplete="new-password"
          required
        />
      </FormField>

      <SubmitButton>재설정 적용</SubmitButton>
    </form>
  );
}
