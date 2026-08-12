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
    <article className="flex w-full flex-col gap-2">
      <TextLink
        href={ROUTES.diary.date(entry.date)}
        className="text-base font-medium no-underline hover:underline sm:text-lg"
      >
        {dateLabel}
      </TextLink>

      <TextLink
        href={ROUTES.diary.date(entry.date)}
        className="block rounded-lg bg-zinc-100 p-4 no-underline dark:bg-zinc-800"
      >
        {entry.isEmpty ? (
          <div className="flex min-h-[99px] items-center justify-center">
            <IconButton label="클립 추가" />
          </div>
        ) : (
          <div className="relative min-h-[99px]">
            <p className="text-sm text-zinc-500">영상들 썸네일 블러처리</p>
            {entry.relativeLabel ? (
              <span className="absolute bottom-2 right-2 text-sm text-zinc-600 dark:text-zinc-400">
                {entry.relativeLabel}
              </span>
            ) : null}
          </div>
        )}
      </TextLink>
    </article>
  );
}
