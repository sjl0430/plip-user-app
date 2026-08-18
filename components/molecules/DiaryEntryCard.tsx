import { IconButton, TextLink } from "@/components/atoms";
import { formatDiaryDate } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";
import type { UiDiaryDateEntry } from "@/types/diary/ui";

type DiaryEntryCardProps = {
  entry: UiDiaryDateEntry;
};

export function DiaryEntryCard({ entry }: DiaryEntryCardProps) {
  const dateLabel = formatDiaryDate(entry.date);

  return (
    <article className="flex w-full flex-col gap-2 px-1">
      <TextLink
        href={ROUTES.diary.date(entry.date)}
        className="text-base font-semibold text-black no-underline hover:underline sm:text-lg"
      >
        {dateLabel}
      </TextLink>

      <TextLink
        href={ROUTES.diary.date(entry.date)}
        className="block rounded-xl border border-black/8 bg-zinc-50 p-3 no-underline"
      >
        {entry.isEmpty ? (
          <div className="flex min-h-[99px] items-center justify-center">
            <IconButton label="클립 추가" />
          </div>
        ) : (
          <div className="relative min-h-[99px] overflow-hidden rounded-lg bg-zinc-200">
            <p className="p-3 text-sm text-black/50">클립 썸네일</p>
            {entry.relativeLabel ? (
              <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
                {entry.relativeLabel}
              </span>
            ) : null}
          </div>
        )}
      </TextLink>
    </article>
  );
}
