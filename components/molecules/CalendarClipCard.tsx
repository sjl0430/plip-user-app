import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { CalendarClip } from "@/config/calendar-mock";

type CalendarClipCardProps = {
  clip: CalendarClip;
};

export function CalendarClipCard({ clip }: CalendarClipCardProps) {
  return (
    <TextLink href={ROUTES.viewer.clip(clip.id)} className="flex w-[103px] shrink-0 flex-col gap-[4px] rounded-[12px] bg-[var(--dl-color-bg-surface)] p-[8px] !no-underline no-underline">
      <div className="relative w-[87px] h-[54px] overflow-hidden rounded-[8px] [&_img:first-child]:w-full [&_img:first-child]:h-full [&_img:first-child]:object-cover">
        <img src={clip.thumbSrc} alt="" width={87} height={54} />
        <span className="absolute top-[50%] left-[50%] w-[20px] h-[20px] [transform:translate(-50%,_-50%)]">
          <img src="/plip/daily-loop/cal-play.svg" alt="" width={20} height={20} />
          <DailyIcon
            name="play"
            size={10}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </span>
      </div>
      <p className="m-0 text-[11px] font-semibold leading-[15px] text-[var(--dl-color-text-primary)]">{clip.name}</p>
      <p className="m-0 text-[9px] leading-[12px] text-[var(--dl-color-text-secondary)]"># {clip.topic}</p>
    </TextLink>
  );
}
