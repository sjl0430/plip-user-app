"use client";

import { restoreAccountAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UiRestorePayload } from "@/types/auth/ui";
import { signIn } from "next-auth/react";
import { useState } from "react";

type RestoreAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payload: UiRestorePayload | null;
  onCompleted: () => void;
};

export function RestoreAccountDialog({
  open,
  onOpenChange,
  payload,
  onCompleted,
}: RestoreAccountDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleRestore() {
    if (!payload) return;

    setPending(true);
    setError(null);

    const result = await restoreAccountAction(payload);
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    if (payload.type === "local") {
      const signInResult = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      if (signInResult?.error) {
        setError("복구 후 로그인에 실패했습니다.");
        setPending(false);
        return;
      }
    }

    setPending(false);
    onOpenChange(false);
    onCompleted();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!pending} className="w-full rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[16px_14px] border-[var(--dl-color-border-default)] bg-white">
        <DialogHeader>
          <DialogTitle className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-base">탈퇴 유예 중인 계정</DialogTitle>
          <DialogDescription className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)] text-[13px]">
            30일 유예 기간 중입니다. 계정을 복구하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        {error ? <p className="text-[12px] text-red-600">{error}</p> : null}
        <DialogFooter className="border-0 bg-transparent p-0">
          <SubmitButton
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
          >
            취소
          </SubmitButton>
          <SubmitButton type="button" variant="brand" disabled={pending || !payload} onClick={handleRestore}>
            복구
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}