import { Input, SubmitButton } from "@/components/atoms";
import {
  AuthNavigationLinks,
  CheckboxField,
  EmailWithOtpAction,
  FormField,
  PasswordInput,
} from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function SignUpForm() {
  return (
    <form className="flex w-full flex-col gap-6" action={ROUTES.signup} method="post">
      <div className="flex flex-col gap-4">
        <EmailWithOtpAction />

        <FormField label="비밀번호" htmlFor="signup-password">
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            required
          />
        </FormField>

        <FormField label="비밀번호 확인" htmlFor="signup-password-confirm">
          <PasswordInput
            id="signup-password-confirm"
            name="passwordConfirm"
            autoComplete="new-password"
            required
          />
        </FormField>

        <FormField label="닉네임" htmlFor="signup-nickname">
          <Input
            id="signup-nickname"
            name="nickname"
            type="text"
            autoComplete="nickname"
            required
          />
        </FormField>

        <fieldset className="flex flex-col gap-2">
          <legend className="sr-only">약관 동의</legend>
          <CheckboxField
            id="terms-service"
            name="termsService"
            label="서비스 이용약관 (필수)"
            required
          />
          <CheckboxField
            id="terms-privacy"
            name="termsPrivacy"
            label="개인정보 처리방침 (필수)"
            required
          />
          <CheckboxField
            id="terms-marketing"
            name="termsMarketing"
            label="마케팅 수신 동의 (선택)"
          />
        </fieldset>
      </div>

      <SubmitButton>회원가입</SubmitButton>
      <AuthNavigationLinks variant="signup" />
    </form>
  );
}
