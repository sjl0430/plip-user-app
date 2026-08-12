import { SubmitButton } from "@/components/atoms";
import { FormField, PasswordInput } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function ChangePasswordForm() {
  return (
    <form
      className="flex w-full flex-col gap-6"
      action={ROUTES.mypage.profile}
      method="get"
    >
      <FormField label="현재 비밀번호" htmlFor="current-password">
        <PasswordInput
          id="current-password"
          name="currentPassword"
          autoComplete="current-password"
          required
        />
      </FormField>

      <FormField label="새 비밀번호" htmlFor="new-password">
        <PasswordInput
          id="new-password"
          name="newPassword"
          autoComplete="new-password"
          required
        />
      </FormField>

      <FormField label="새 비밀번호 확인" htmlFor="new-password-confirm">
        <PasswordInput
          id="new-password-confirm"
          name="newPasswordConfirm"
          autoComplete="new-password"
          required
        />
      </FormField>

      <SubmitButton>변경 적용</SubmitButton>
    </form>
  );
}
