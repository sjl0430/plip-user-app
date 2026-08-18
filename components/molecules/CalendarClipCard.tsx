import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { CalendarClip } from "@/config/calendar-mock";

type CalendarClipCardProps = {
  clip: CalendarClip;
};

export function CalendarClipCard({ clip }: CalendarClipCardProps) {
  return (
    <TextLink href={ROUTES.viewer.clip(clip.id)} className="dl-clip-card no-underline">
      <div className="dl-clip-card__thumb">
        <img src={clip.thumbSrc} alt="" width={87} height={54} />
        <span className="dl-clip-card__play">
          <img src="/plip/daily-loop/cal-play.svg" alt="" width={20} height={20} />
          <DailyIcon
            name="play"
            size={10}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </span>
      </div>
      <p className="dl-clip-card__name">{clip.name}</p>
      <p className="dl-clip-card__topic"># {clip.topic}</p>
    </TextLink>
  );
}
