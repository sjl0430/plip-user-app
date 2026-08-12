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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="다이얼로그 닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <dialog
        open
        aria-labelledby="create-theme-title"
        className="relative z-10 w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      >
        <h2 id="create-theme-title" className="text-lg font-semibold">
          테마 생성
        </h2>

        <form className="mt-4 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="theme-name">테마 이름</Label>
            <Input id="theme-name" name="themeName" placeholder="테마 이름" required />
          </div>

          <div className="flex justify-end gap-2">
            <SubmitButton type="button" className="w-auto bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50" onClick={onClose}>
              취소
            </SubmitButton>
            <SubmitButton type="submit" className="w-auto">
              생성
            </SubmitButton>
          </div>
        </form>
      </dialog>
    </div>
  );
}
