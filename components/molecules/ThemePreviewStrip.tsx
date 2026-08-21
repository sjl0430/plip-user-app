import { TextLink, ThemeChip } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiDiaryTheme } from "@/types/diary/ui";

type ThemePreviewStripProps = {
  themes: UiDiaryTheme[];
};

const ACCENTS = ["pink", "cyan", "pink", "cyan", "pink"] as const;
const THEME_SLOT_COUNT = 5;

/** Figma `Hybrid / Diary` stories row */
export function ThemePreviewStrip({ themes }: ThemePreviewStripProps) {
  const visibleThemes = themes.slice(0, THEME_SLOT_COUNT);

  return (
    <section aria-label="테마 스토리" className="w-full shrink-0">
      <TextLink
        href={ROUTES.diary.themes.root}
        className="mb-3 block text-[13px] font-bold text-[#161823] no-underline"
      >
        테마
      </TextLink>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: THEME_SLOT_COUNT }, (_, index) => {
          const theme = visibleThemes[index];

          if (!theme) {
            return (
              <div
                key={`theme-slot-${index}`}
                className="flex w-full flex-col items-center gap-1.5"
                aria-hidden
              >
                <span className="block size-14" />
                <span className="h-[13px] w-full max-w-16" />
              </div>
            );
          }

          return (
            <ThemeChip
              key={theme.id}
              name={theme.name}
              href={ROUTES.diary.themes.detail(theme.id)}
              accent={ACCENTS[index % ACCENTS.length]}
              className="w-full max-w-none items-center"
            />
          );
        })}
      </div>
    </section>
  );
}
