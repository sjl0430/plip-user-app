"use client";

import { IconButton, SubmitButton } from "@/components/atoms";
import { VideoThumbnailGrid } from "@/components/molecules";
import { CreateThemeDialog } from "@/components/organisms/CreateThemeDialog";
import { useState } from "react";

export function DiaryThemesListSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold sm:text-xl">테마</h2>
          <SubmitButton
            type="button"
            className="w-auto px-4"
            onClick={() => setDialogOpen(true)}
          >
            생성
          </SubmitButton>
        </div>

        <div className="relative">
          <VideoThumbnailGrid count={5} />
          <IconButton
            label="테마 삭제"
            className="absolute right-2 top-2 size-5 bg-white/80 sm:size-6"
          />
        </div>
      </div>

      <CreateThemeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
