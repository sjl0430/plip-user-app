import { TextLink } from "@/components/atoms";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDiaryDate, formatDiaryWeekday } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import type { UiDiaryDateEntry } from "@/types/diary/ui";
import { Plus } from "lucide-react";

type DiaryDateScrollSectionProps = {
  entry: UiDiaryDateEntry;
};

const TILES = ["bg-[#1a2744]", "bg-[#032426]", "bg-[#2a1a3a]"] as const;

/** Figma Hybrid Diary — 일자 + 3열 모자이크 */
export function DiaryDateScrollSection({ entry }: DiaryDateScrollSectionProps) {
  const dateLabel = formatDiaryDate(entry.date);
  const weekday = formatDiaryWeekday(entry.date);
  const isEmpty = entry.isEmpty || !entry.hasClips;
  const href = isEmpty ? ROUTES.create : ROUTES.diary.date(entry.date);

  return (
    <article className="flex flex-col gap-2" aria-label={`${dateLabel} 다이어리`}>
      <div className="flex items-center justify-between gap-3 px-0.5">
        <TextLink
          href={ROUTES.diary.date(entry.date)}
          className="text-[13px] font-bold text-[#161823] no-underline"
        >
          {dateLabel} · {weekday}
        </TextLink>
        {entry.relativeLabel ? (
          <Badge variant="secondary" className="rounded-full text-[10px] font-semibold">
            {entry.relativeLabel}
          </Badge>
        ) : null}
      </div>

      <TextLink href={href} className="block no-underline">
        <Card className="overflow-hidden border-0 p-0 shadow-none ring-1 ring-black/5">
          {isEmpty ? (
            <div className="flex min-h-[158px] flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground">
              <span className="grid size-10 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                <Plus className="size-5 text-primary" />
              </span>
              <span className="text-xs font-semibold">새 클립 추가</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-px bg-white">
              {TILES.map((tile) => (
                <div key={tile} className={`min-h-[158px] ${tile}`} aria-hidden />
              ))}
            </div>
          )}
        </Card>
      </TextLink>
    </article>
  );
}
