"use client";

import { SubmitButton, TextLink } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function ResetPasswordForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex w-full flex-col gap-4">
        <h2 className="dl-title">비밀번호 변경 완료</h2>
        <p className="dl-subtitle">새 비밀번호가 안전하게 저장되었습니다.</p>
        <TextLink href={ROUTES.login} className="dl-btn dl-btn--primary no-underline">
          로그인하기
        </TextLink>
        <p className="text-center text-[13px] text-[var(--dl-color-text-secondary)]">
          보안을 위해 모든 기기에서 다시 로그인해 주세요.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <h2 className="dl-title">새 비밀번호 설정</h2>
      <p className="dl-subtitle">이전에 사용하지 않은 비밀번호를 입력해 주세요.</p>
      <AuthField
        id="reset-password"
        name="password"
        type="password"
        label="새 비밀번호"
        placeholder="8자 이상 입력"
        autoComplete="new-password"
        required
      />
      <AuthField
        id="reset-password-confirm"
        name="passwordConfirm"
        type="password"
        label="새 비밀번호 확인"
        placeholder="한 번 더 입력"
        autoComplete="new-password"
        required
      />
      <p className="m-0 text-[12px] text-[var(--dl-color-text-secondary)]">
        영문·숫자를 포함해 8자 이상 입력해 주세요.
      </p>
      <SubmitButton variant="brand">비밀번호 변경</SubmitButton>
    </form>
  );
}
