import { TextLink } from "@/components/atoms";
import { formatDiaryDate } from "@/config/diary-mock";
import { ROUTES } from "@/config/routes";

type DiaryThemeClipGroupProps = {
  themeName: string;
  date: string;
  clipCount: number;
  showDateLink?: boolean;
};

function ThumbGrid({ count }: { count: number }) {
  const items = Array.from({ length: Math.max(count, 0) }, (_, index) => index);
  return (
    <div className="plip-diary-thumb-grid">
      {items.map((item) => (
        <div key={item} className="plip-diary-thumb" aria-hidden />
      ))}
    </div>
  );
}

export function DiaryThemeClipGroup({
  themeName,
  date,
  clipCount,
  showDateLink = false,
}: DiaryThemeClipGroupProps) {
  const title = showDateLink ? formatDiaryDate(date) : themeName;

  return (
    <section className="plip-diary-clip-group" aria-label={title}>
      {showDateLink ? (
        <TextLink href={ROUTES.diary.date(date)} className="plip-diary-clip-group__title">
          {title}
        </TextLink>
      ) : (
        <h3 className="plip-diary-clip-group__title">{title}</h3>
      )}
      <ThumbGrid count={Math.min(clipCount, 5)} />
    </section>
  );
}
