"use client";

import { Input, Label, SubmitButton } from "@/components/atoms";

type CreateThemeDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateThemeDialog({ open, onClose }: CreateThemeDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="다이얼로그 닫기"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <dialog
        open
        aria-labelledby="create-theme-title"
        className="plip-diary-dialog relative z-10 w-full max-w-[315px] p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="create-theme-title" className="text-base font-extrabold text-[#111]">
            테마 생성
          </h2>
          <button
            type="button"
            aria-label="닫기"
            className="text-sm font-bold text-black/45"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="theme-name">이름</Label>
            <Input id="theme-name" name="themeName" placeholder="테마 이름" required />
          </div>

          <div className="flex justify-end gap-2">
            <SubmitButton
              type="button"
              className="dc-btn w-auto"
              onClick={onClose}
            >
              취소
            </SubmitButton>
            <SubmitButton
              type="submit"
              className="dc-btn w-auto"
            >
              생성
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
