"use client";

import { Input, Label, SubmitButton } from "@/components/atoms";
import { AnimatedDialog } from "@/components/molecules/AnimatedOverlays";

type CreateThemeDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateThemeDialog({ open, onClose }: CreateThemeDialogProps) {
  return (
    <AnimatedDialog open={open} onClose={onClose} labelledBy="create-theme-title" className="plip-diary-dialog">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id="create-theme-title" className="text-base font-extrabold text-[#111]">
          테마 생성
        </h2>
        <button type="button" aria-label="닫기" className="text-sm font-bold text-black/45" onClick={onClose}>
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
          <SubmitButton type="button" className="dc-btn w-auto" onClick={onClose}>
            취소
          </SubmitButton>
          <SubmitButton type="submit" className="dc-btn w-auto">
            생성
          </SubmitButton>
        </div>
      </form>
    </AnimatedDialog>
  );
}
