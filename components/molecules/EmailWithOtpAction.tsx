"use client";

import { Input, SubmitButton } from "@/components/atoms";
import { FormField } from "@/components/molecules/FormField";
import { useState } from "react";

type EmailWithOtpActionProps = {
  emailId?: string;
  otpId?: string;
  showOtpField?: boolean;
  onSendOtp?: () => void;
};

export function EmailWithOtpAction({
  emailId = "email",
  otpId = "otp",
  showOtpField: showOtpFieldProp,
  onSendOtp,
}: EmailWithOtpActionProps) {
  const [otpSent, setOtpSent] = useState(false);
  const showOtpField = showOtpFieldProp ?? otpSent;

  const handleSendOtp = () => {
    setOtpSent(true);
    onSendOtp?.();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <FormField label="이메일" htmlFor={emailId}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={emailId}
            name={emailId}
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-1"
          />
          <SubmitButton
            type="button"
            className="w-full shrink-0 px-3 sm:w-auto"
            onClick={handleSendOtp}
          >
            인증 번호 발송
          </SubmitButton>
        </div>
      </FormField>

      {showOtpField ? (
        <FormField htmlFor={otpId}>
          <Input
            id={otpId}
            name={otpId}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="인증 번호"
            required
          />
        </FormField>
      ) : null}
    </div>
  );
}
