import { SubmitButton, TextLink } from "@/components/atoms";
import { AuthDivider, AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function LoginForm() {
  return (
    <form className="flex w-full flex-col gap-4" action={ROUTES.home} method="get">
      <AuthField
        id="login-email"
        name="email"
        type="email"
        label="이메일"
        placeholder="name@example.com"
        autoComplete="email"
        required
      />
      <AuthField
        id="login-password"
        name="password"
        type="password"
        label="비밀번호"
        placeholder="••••••••"
        autoComplete="current-password"
        required
      />
      <TextLink href={ROUTES.forgotPassword} className="dl-link self-end text-right text-[12px] leading-[15px]">
        비밀번호를 잊으셨나요?
      </TextLink>
      <SubmitButton variant="brand">로그인</SubmitButton>
      <AuthDivider />
      <SubmitButton type="button" variant="outline">
        Google로 계속
      </SubmitButton>
      <p className="text-center text-[13px] font-medium leading-4 text-[var(--dl-color-text-brand)]">
        계정이 없나요?{" "}
        <TextLink href={ROUTES.signup} className="dl-link text-[13px]">
          회원가입
        </TextLink>
      </p>
    </form>
  );
}
