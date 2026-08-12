import { ThemeChip } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ROUTES } from "@/config/routes";
import type { UiDiaryTheme } from "@/types/diary/ui";

type ThemePreviewStripProps = {
  themes: UiDiaryTheme[];
};

export function ThemePreviewStrip({ themes }: ThemePreviewStripProps) {
  return (
    <section aria-label="테마 미리보기" className="plip-diary-theme-strip">
      <SectionHeader
        title="테마"
        actionLabel="전체보기"
        actionHref={ROUTES.diary.themes.root}
        className="plip-diary-theme-strip__header"
      />

      <div className="plip-diary-theme-strip__row">
        {themes.map((theme) => (
          <ThemeChip
            key={theme.id}
            name={theme.name}
            href={ROUTES.diary.themes.detail(theme.id)}
            className="plip-diary-theme-chip"
          />
        ))}
      </div>
    </section>
  );
}
