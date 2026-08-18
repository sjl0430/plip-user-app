import { ThemeChip } from "@/components/atoms";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ROUTES } from "@/config/routes";
import type { UiDiaryTheme } from "@/types/diary/ui";

type ThemePreviewStripProps = {
  themes: UiDiaryTheme[];
};

const ACCENTS = ["pink", "cyan", "pink", "cyan"] as const;

/** Figma `Hybrid / Diary` stories row */
export function ThemePreviewStrip({ themes }: ThemePreviewStripProps) {
  return (
    <section aria-label="테마 스토리" className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3.5 px-1 pb-2">
          <ThemeChip name="추가" href={ROUTES.diary.themes.root} accent="add" />
          {themes.map((theme, index) => (
            <ThemeChip
              key={theme.id}
              name={theme.name}
              href={ROUTES.diary.themes.detail(theme.id)}
              accent={ACCENTS[index % ACCENTS.length]}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
