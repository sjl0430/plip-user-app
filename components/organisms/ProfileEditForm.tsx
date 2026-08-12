import { SubmitButton, TextLink } from "@/components/atoms";
import { CheckboxField, FormField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function ProfileEditForm() {
  return (
    <form
      className="flex w-full flex-col gap-6"
      action={ROUTES.mypage.root}
      method="post"
    >
      <FormField label="이메일" htmlFor="profile-email">
        <p id="profile-email" className="text-sm text-zinc-700 dark:text-zinc-300">
          plip123@gmail.com
        </p>
      </FormField>

      <FormField label="비밀번호">
        <TextLink
          href={ROUTES.mypage.password}
          className="flex h-9 w-full items-center justify-center rounded-md border border-zinc-200 no-underline dark:border-zinc-700"
        >
          비밀번호 변경
        </TextLink>
      </FormField>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium">약관 동의</legend>
        <CheckboxField
          id="profile-terms-service"
          name="termsService"
          label="서비스 이용약관 (필수)"
          required
        />
        <CheckboxField
          id="profile-terms-privacy"
          name="termsPrivacy"
          label="개인정보 처리방침 (필수)"
          required
        />
      </fieldset>

      <SubmitButton>저장</SubmitButton>
    </form>
  );
}
