"use client";

import { TextLink } from "@/components/atoms";
import { CreateThemeDialog } from "@/components/organisms/CreateThemeDialog";
import { DIARY_THEMES } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import { useState } from "react";

export function DiaryThemesListSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="plip-diary-themes">
        <div className="plip-diary-themes__head">
          <h2>Themes</h2>
          <button
            type="button"
            className="plip-diary-themes__create"
            onClick={() => setDialogOpen(true)}
          >
            생성
          </button>
        </div>

        <div className="plip-diary-themes__grid">
          {DIARY_THEMES.map((theme, index) => (
            <div key={theme.id} className="plip-diary-themes__card">
              <TextLink
                href={ROUTES.diary.themes.detail(theme.id)}
                className="plip-diary-themes__link"
              >
                <span
                  className={`plip-diary-themes__thumb is-${(index % 3) + 1}`}
                  aria-hidden
                />
                <span className="plip-diary-themes__name">{theme.name}</span>
              </TextLink>
              {index === 0 ? (
                <button
                  type="button"
                  className="plip-diary-themes__menu"
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
