"use client";

import { SubmitButton, TextLink } from "@/components/atoms";
import { AgreementRow } from "@/components/molecules/AgreementRow";
import { AuthField } from "@/components/molecules/AuthField";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { ProgressTrack } from "@/components/molecules/ProgressTrack";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpStep = 1 | 2 | 3;

export function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState<SignUpStep>(1);
  const [email, setEmail] = useState("");
  const [agreeAll, setAgreeAll] = useState(true);
  const [terms, setTerms] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const toggleAll = (checked: boolean) => {
    setAgreeAll(checked);
    setTerms(checked);
    setPrivacy(checked);
    setMarketing(checked);
  };

  const syncAll = (next: { terms?: boolean; privacy?: boolean; marketing?: boolean }) => {
    const nextTerms = next.terms ?? terms;
    const nextPrivacy = next.privacy ?? privacy;
    const nextMarketing = next.marketing ?? marketing;
    setTerms(nextTerms);
    setPrivacy(nextPrivacy);
    setMarketing(nextMarketing);
    setAgreeAll(nextTerms && nextPrivacy && nextMarketing);
  };

  if (step === 1) {
    return (
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          setEmail(String(form.get("email") ?? ""));
          setStep(2);
        }}
      >
        <AuthTopBar title="" backHref={ROUTES.intro} />
        <h2 className="dl-title">이메일로 가입하기</h2>
        <p className="dl-subtitle">계정을 만들고 PLIP의 기록을 시작하세요.</p>
        <AuthField
          id="signup-email"
          name="email"
          type="email"
          label="이메일"
          placeholder="name@example.com"
          autoComplete="email"
          required
          defaultValue={email}
        />
        <AuthField
          id="signup-password"
          name="password"
          type="password"
          label="비밀번호"
          placeholder="8자 이상 입력"
          autoComplete="new-password"
          required
        />
        <AuthField
          id="signup-password-confirm"
          name="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="한 번 더 입력"
          autoComplete="new-password"
          required
        />
        <SubmitButton variant="brand">다음</SubmitButton>
        <p className="text-center text-[13px] font-medium text-[var(--dl-color-text-brand)]">
          이미 계정이 있나요?{" "}
          <TextLink href={ROUTES.login} className="dl-link text-[13px]">
            로그인
          </TextLink>
        </p>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setStep(3);
        }}
      >
        <AuthTopBar title="" onBack={() => setStep(1)} />
        <h2 className="dl-title">이메일을 확인해 주세요</h2>
        <p className="dl-subtitle">
          {email || "name@example.com"}으로 보낸 6자리 코드를 입력하세요.
        </p>
        <AuthField
          id="signup-otp"
          name="otp"
          type="text"
          label="인증 코드"
          placeholder="123456"
          autoComplete="one-time-code"
          required
        />
        <button type="button" className="dl-link self-end text-[12px]">
          인증 메일 다시 보내기
        </button>
        <SubmitButton variant="brand">인증 완료</SubmitButton>
        <p className="text-center text-[13px] text-[var(--dl-color-text-secondary)]">
          메일이 오지 않았나요?  스팸함도 확인해 주세요.
        </p>
      </form>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!terms || !privacy) return;
        router.push(ROUTES.signupProfile);
      }}
    >
      <AuthTopBar title="" onBack={() => setStep(2)} />
      <ProgressTrack value={50} />
      <h2 className="dl-title">가입 전 확인해 주세요</h2>
      <p className="dl-subtitle">필수 약관에 동의하면 프로필 설정으로 이동합니다.</p>
      <AgreementRow
        id="agree-all"
        name="agreeAll"
        label="전체 동의"
        checked={agreeAll}
        onChange={toggleAll}
      />
      <hr className="border-[var(--dl-color-border-default)]" />
      <AgreementRow
        id="terms-service"
        name="termsService"
        label="[필수] 서비스 이용약관"
        required
        checked={terms}
        onChange={(checked) => syncAll({ terms: checked })}
      />
      <AgreementRow
        id="terms-privacy"
        name="termsPrivacy"
        label="[필수] 개인정보 수집·이용"
        required
        checked={privacy}
        onChange={(checked) => syncAll({ privacy: checked })}
      />
      <AgreementRow
        id="terms-marketing"
        name="termsMarketing"
        label="[선택] 새 기능과 이벤트 소식"
        checked={marketing}
        onChange={(checked) => syncAll({ marketing: checked })}
      />
      <div className="mt-auto flex flex-col gap-3 pt-10">
        <SubmitButton variant="brand">동의하고 계속</SubmitButton>
        <p className="text-center text-[11px] text-[var(--dl-color-text-tertiary)]">
          선택 동의는 설정에서 언제든 변경할 수 있어요.
        </p>
      </div>
    </form>
  );
}
