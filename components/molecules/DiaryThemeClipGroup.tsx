import { TextLink } from "@/components/atoms";
import { VideoThumbnailGrid } from "@/components/molecules/VideoThumbnailGrid";
import { formatDiaryDate } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";

type DiaryThemeClipGroupProps = {
  themeName: string;
  date: string;
  clipCount: number;
  showDateLink?: boolean;
};

export function DiaryThemeClipGroup({
  themeName,
  date,
  clipCount,
  showDateLink = false,
}: DiaryThemeClipGroupProps) {
  const title = showDateLink ? formatDiaryDate(date) : themeName;

  return (
    <section className="flex w-full flex-col gap-3">
      {showDateLink ? (
        <TextLink
          href={ROUTES.diary.date(date)}
          className="text-base font-medium no-underline hover:underline"
        >
          {title}
        </TextLink>
      ) : (
        <h3 className="text-base font-medium sm:text-lg">{title}</h3>
      )}

      <VideoThumbnailGrid count={Math.min(clipCount, 5)} blurred />
    </section>
  );
}
