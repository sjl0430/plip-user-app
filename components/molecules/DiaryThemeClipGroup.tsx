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
    <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[1px] bg-[#fff]">
      {items.map((item) => (
        <div key={item} className="aspect-[1_/_1] rounded-[0] bg-[linear-gradient(160deg,_rgba(37,_244,_238,_0.12),_transparent_50%),_linear-gradient(145deg,_#5a5a5a,_#1f1f1f)] [&:nth-child(3n + 2)]:bg-[linear-gradient(160deg,_rgba(254,_44,_85,_0.16),_transparent_55%),_linear-gradient(145deg,_#4a4a4a,_#181818)] [&:nth-child(3n)]:bg-[linear-gradient(145deg,_#6a6a6a,_#242424)]" aria-hidden />
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
    <section className="flex flex-col gap-[0.65rem]" aria-label={title}>
      {showDateLink ? (
        <TextLink href={ROUTES.diary.date(date)} className="m-0 text-[0.88rem] font-extrabold !text-[#111] !no-underline">
          {title}
        </TextLink>
      ) : (
        <h3 className="m-0 text-[0.88rem] font-extrabold !text-[#111] !no-underline">{title}</h3>
      )}
      <ThumbGrid count={Math.min(clipCount, 5)} />
    </section>
  );
}
