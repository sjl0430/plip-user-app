"use client";

import { SubmitButton, TextLink } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("name@example.com");

  if (sent) {
    return (
      <div className="flex w-full flex-col gap-4">
        <h2 className="dl-title">재설정 메일을 보냈어요</h2>
        <p className="dl-subtitle">
          {email}의 받은 편지함을 확인해 주세요.
          <br />
          링크는 30분 동안 유효합니다.
        </p>
        <TextLink href={ROUTES.resetPassword} className="dl-btn dl-btn--primary no-underline">
          메일함 열기
        </TextLink>
        <button type="button" className="dl-link text-center text-[13px]" onClick={() => setSent(false)}>
          메일을 받지 못했나요?  다시 보내기
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setEmail(String(form.get("email") ?? email));
        setSent(true);
      }}
    >
      <h2 className="dl-title">비밀번호를 잊으셨나요?</h2>
      <p className="dl-subtitle">가입한 이메일로 재설정 링크를 보내드릴게요.</p>
      <AuthField
        id="reset-email"
        name="email"
        type="email"
        label="이메일"
        placeholder="name@example.com"
        autoComplete="email"
        required
      />
      <SubmitButton variant="brand">재설정 링크 보내기</SubmitButton>
      <p className="text-center text-[13px] text-[var(--dl-color-text-brand)]">
        이메일이 기억났나요?{" "}
        <TextLink href={ROUTES.login} className="dl-link text-[13px]">
          로그인
        </TextLink>
      </p>
    </form>
  );
}
