"use client";

import { createThemeAction, updateThemeNameAction } from "@/actions/diaryActions";
import { Input, Label, SubmitButton } from "@/components/atoms";
import { AnimatedDialog } from "@/components/molecules/AnimatedOverlays";
import type { UiDiaryTheme } from "@/types/diary/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CreateThemeDialogProps = {
  open: boolean;
  onClose: () => void;
  theme?: UiDiaryTheme | null;
};

const dialogActionClassName =
  "inline-flex items-center justify-center gap-[0.5rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_1rem] text-[0.8125rem] font-medium leading-[1.25rem] !text-[var(--dc-fg-primary)] !no-underline w-auto";

export function CreateThemeDialog({ open, onClose, theme = null }: CreateThemeDialogProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = theme !== null;
  const titleId = isEdit ? "edit-theme-title" : "create-theme-title";

  function handleClose() {
    if (pending) {
      return;
    }
    setError(null);
    onClose();
  }

  async function handleSubmit(formData: FormData) {
    if (pending) {
      return;
    }

    setError(null);
    setPending(true);

    const result = isEdit
      ? await updateThemeNameAction(theme.id, formData.get("themeName"))
      : await createThemeAction(formData.get("themeName"));

    setPending(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.refresh();
    handleClose();
  }

  return (
    <AnimatedDialog
      open={open}
      onClose={handleClose}
      labelledBy={titleId}
      className="w-[min(420px,_calc(100vw_-_2rem))] p-[1.25rem] border border-[var(--dc-glass-border)] rounded-[var(--dc-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow-card)] backdrop-blur-[20px]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-base font-extrabold text-[#111]">
          {isEdit ? "테마 수정" : "테마 생성"}
        </h2>
        <button type="button" aria-label="닫기" className="text-sm font-bold text-black/45" onClick={handleClose}>
          ✕
        </button>
      </div>

      <form key={theme?.id ?? "create"} className="flex flex-col gap-4" action={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="theme-name">이름</Label>
          <Input
            id="theme-name"
            name="themeName"
            placeholder="테마 이름"
            defaultValue={theme?.name ?? ""}
            required
            disabled={pending}
          />
        </div>

        {error ? <p className="m-0 text-sm text-red-600">{error}</p> : null}

        <div className="flex justify-end gap-2">
          <SubmitButton
            type="button"
            className={dialogActionClassName}
            onClick={handleClose}
            disabled={pending}
          >
            취소
          </SubmitButton>
          <SubmitButton type="submit" className={dialogActionClassName} disabled={pending}>
            {isEdit ? "수정" : "생성"}
          </SubmitButton>
        </div>
      </form>
    </AnimatedDialog>
  );
}
