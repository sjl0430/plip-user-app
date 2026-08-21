"use client";
import leftoverStyles from "@/components/styles/leftover.module.css";

import { TextLink } from "@/components/atoms";
import { CreateThemeDialog } from "@/components/organisms/CreateThemeDialog";
import { DIARY_THEMES } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function DiaryThemesListSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[0.95rem] p-[0.9rem_1rem_1.5rem]">
        <div className={`${leftoverStyles.plipDiaryThemesHead} flex items-center justify-between gap-3`}>
          <h2>Themes</h2>
          <button
            type="button"
            className="border border-[var(--dc-glass-border)] rounded-[var(--dc-btn-radius)] bg-[linear-gradient(180deg,_var(--dc-glass-from),_var(--dc-glass-to))] shadow-[var(--dc-shadow)] backdrop-blur-[20px] p-[0.4rem_0.85rem] text-[var(--dc-fg-primary)] text-[0.8rem] font-medium cursor-pointer"
            onClick={() => setDialogOpen(true)}
          >
            생성
          </button>
        </div>

        <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[0.85rem_0.35rem] bg-[transparent]">
          {DIARY_THEMES.map((theme, index) => (
            <div key={theme.id} className="relative m-0">
              <TextLink
                href={ROUTES.diary.themes.detail(theme.id)}
                className="!flex flex-col gap-[0.4rem] !text-[#111] !no-underline"
              >
                <span
                  className={`block aspect-[1_/_1] rounded-[0] bg-[linear-gradient(145deg,_#666,_#222)] [&.is-1]:bg-[linear-gradient(160deg,_rgba(91,_61,_255,_0.35),_transparent_55%),_linear-gradient(145deg,_#555,_#1c1c1c)] [&.is-2]:bg-[linear-gradient(160deg,_rgba(37,_244,_238,_0.35),_transparent_55%),_linear-gradient(145deg,_#555,_#1c1c1c)] [&.is-3]:bg-[linear-gradient(145deg,_#6a6a6a,_#222)] is-${(index % 3) + 1}`}
                  aria-hidden
                />
                <span className="text-[0.78rem] font-bold">{theme.name}</span>
              </TextLink>
              {index === 0 ? (
                <button
                  type="button"
                  className="absolute top-[0.35rem] right-[0.35rem] z-20 grid place-items-center w-[1.5rem] h-[1.5rem] border-0 rounded-[999px] bg-[rgba(0,_0,_0,_0.45)] text-[#fff] text-[0.85rem] font-extrabold leading-none cursor-pointer"
                  aria-label={`${theme.name} 테마 삭제`}
                >
                  ···
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <CreateThemeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
