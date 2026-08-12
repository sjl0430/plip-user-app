import { DiaryDateScrollSection } from "@/components/molecules/DiaryDateScrollSection";
import { ThemePreviewStrip } from "@/components/molecules";
import { DIARY_MAIN_ENTRIES, DIARY_THEMES } from "@/config/diary-mock";

export function DiaryMainSection() {
  return (
    <>
      <div className="plip-diary-feed" aria-label="날짜별 다이어리">
        {DIARY_MAIN_ENTRIES.map((entry) => (
          <DiaryDateScrollSection key={entry.date} entry={entry} />
        ))}
      </div>

      <ThemePreviewStrip themes={DIARY_THEMES} />
    </>
  );
}
