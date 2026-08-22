"use client";

import {
  listActiveTermsAction,
  requestEmailOtpAction,
  verifyEmailOtpAction,
} from "@/actions/authActions";
import { SubmitButton, TextLink } from "@/components/atoms";
import { ui } from "@/components/atoms/styles";
import { cn } from "@/lib/utils";
import { AgreementRow } from "@/components/molecules/AgreementRow";
import { AuthField } from "@/components/molecules/AuthField";
import { AuthTopBar } from "@/components/molecules";
import { ProgressTrack } from "@/components/molecules/ProgressTrack";
import { ROUTES } from "@/config/routes";
import { saveSignupDraft } from "@/lib/auth/signup-draft";
import type { UiTerm } from "@/types/auth/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SignUpStep = 1 | 2 | 3;

export function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState<SignUpStep>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [terms, setTerms] = useState<UiTerm[]>([]);
  const [agreements, setAgreements] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const requiredTerms = terms.filter((term) => term.required);
  const optionalTerms = terms.filter((term) => !term.required);
  const agreeAll = terms.length > 0 && terms.every((term) => agreements[term.id]);

  useEffect(() => {
    if (step !== 3) {
      return;
    }

    let cancelled = false;
    void listActiveTermsAction().then((result) => {
      if (cancelled) {
        return;
      }
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setTerms(result.data);
      setAgreements((current) => {
        const next = { ...current };
        for (const term of result.data) {
          if (next[term.id] === undefined) {
            next[term.id] = term.required;
          }
        }
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [step]);

  async function handleCredentialsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const nextEmail = String(form.get("email") ?? "").trim();
    const nextPassword = String(form.get("password") ?? "");
    const passwordConfirm = String(form.get("passwordConfirm") ?? "");

    if (nextPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (nextPassword !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    const result = await requestEmailOtpAction(nextEmail, "SIGNUP");
    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setEmail(nextEmail);
    setPassword(nextPassword);
    setStep(2);
  }

  async function handleOtpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const otpCode = String(form.get("otp") ?? "").trim();
    if (!/^\d{6}$/.test(otpCode)) {
      setError("인증 코드 6자리를 입력해 주세요.");
      return;
    }

    setPending(true);
    const result = await verifyEmailOtpAction(email, otpCode, "SIGNUP");
    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setVerificationToken(result.data.verificationToken);
    setStep(3);
  }

  async function handleResendOtp() {
    setError(null);
    setPending(true);
    const result = await requestEmailOtpAction(email, "SIGNUP");
    setPending(false);
    if (!result.ok) {
      setError(result.error);
    }
  }

  function toggleAll(checked: boolean) {
    setAgreements(Object.fromEntries(terms.map((term) => [term.id, checked])));
  }

  function handleTermsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const missingRequired = requiredTerms.some((term) => !agreements[term.id]);
    if (missingRequired) {
      setError("필수 약관에 동의해 주세요.");
      return;
    }

    saveSignupDraft({
      email,
      password,
      verificationToken,
      termsAgreements: terms.map((term) => ({
        termId: term.id,
        agreed: agreements[term.id] === true,
      })),
    });
    router.push(ROUTES.signupProfile);
  }

  if (step === 1) {
    return (
      <form className="flex w-full flex-col gap-4" onSubmit={handleCredentialsSubmit}>
        <AuthTopBar title="" backHref={ROUTES.intro} />
        <h2 className={ui.title}>이메일로 가입하기</h2>
        <p className={ui.subtitle}>계정을 만들고 PLIP의 기록을 시작하세요.</p>
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
          defaultValue={password}
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
        {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
        <SubmitButton variant="brand" disabled={pending}>
          {pending ? "인증 메일 발송 중..." : "다음"}
        </SubmitButton>
        <p className="text-center text-[13px] font-medium text-[var(--dl-color-text-brand)]">
          이미 계정이 있나요?{" "}
          <TextLink href={ROUTES.login} className={cn(ui.link, "text-[13px]")}>
            로그인
          </TextLink>
        </p>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form className="flex w-full flex-col gap-4" onSubmit={handleOtpSubmit}>
        <AuthTopBar title="" onBack={() => setStep(1)} />
        <h2 className={ui.title}>이메일을 확인해 주세요</h2>
        <p className={ui.subtitle}>{email}으로 보낸 6자리 코드를 입력하세요.</p>
        <AuthField
          id="signup-otp"
          name="otp"
          type="text"
          label="인증 코드"
          placeholder="123456"
          autoComplete="one-time-code"
          required
        />
        <button
          type="button"
          className={cn(ui.link, "self-end text-[12px]")}
          disabled={pending}
          onClick={() => void handleResendOtp()}
        >
          인증 메일 다시 보내기
        </button>
        {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
        <SubmitButton variant="brand" disabled={pending}>
          {pending ? "인증 확인 중..." : "인증 완료"}
        </SubmitButton>
        <p className="text-center text-[13px] text-[var(--dl-color-text-secondary)]">
          메일이 오지 않았나요? 스팸함도 확인해 주세요.
        </p>
      </form>
    );
  }

  return (
    <form className="flex w-full flex-col gap-3" onSubmit={handleTermsSubmit}>
      <AuthTopBar title="" onBack={() => setStep(2)} />
      <ProgressTrack value={50} />
      <h2 className={ui.title}>가입 전 확인해 주세요</h2>
      <p className={ui.subtitle}>필수 약관에 동의하면 프로필 설정으로 이동합니다.</p>
      {terms.length > 0 ? (
        <AgreementRow
          id="agree-all"
          name="agreeAll"
          label="전체 동의"
          checked={agreeAll}
          onChange={toggleAll}
        />
      ) : null}
      {terms.length > 0 ? <hr className="border-[var(--dl-color-border-default)]" /> : null}
      {requiredTerms.map((term) => (
        <AgreementRow
          key={term.id}
          id={`term-${term.id}`}
          name={`term-${term.id}`}
          label={`[필수] ${term.title}`}
          required
          checked={agreements[term.id] === true}
          onChange={(checked) => setAgreements((current) => ({ ...current, [term.id]: checked }))}
        />
      ))}
      {optionalTerms.map((term) => (
        <AgreementRow
          key={term.id}
          id={`term-${term.id}`}
          name={`term-${term.id}`}
          label={`[선택] ${term.title}`}
          checked={agreements[term.id] === true}
          onChange={(checked) => setAgreements((current) => ({ ...current, [term.id]: checked }))}
        />
      ))}
      {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
      <div className="mt-auto flex flex-col gap-3 pt-10">
        <SubmitButton variant="brand">동의하고 계속</SubmitButton>
        <p className="text-center text-[11px] text-[var(--dl-color-text-tertiary)]">
          선택 동의는 설정에서 언제든 변경할 수 있어요.
        </p>
      </div>
    </form>
  );
}
