import { DailyIcon, TextLink } from "@/components/atoms";

type TopicEmptySlotProps = {
  captureHref: string;
};

export function TopicEmptySlot({ captureHref }: TopicEmptySlotProps) {
  // TODO: 아지트 부착 후 촬영 이동 시 토픽 지정을 querystring 등으로 넘길지 결정
  // 예: /create?topicId= 또는 /agit/{agitId}/upload?topicId=
  return (
    <TextLink
      href={captureHref}
      aria-label="영상 촬영"
      className="flex min-h-0 flex-1 items-center justify-center rounded-[18px] border border-dashed border-[var(--dl-color-border-brand)] bg-[linear-gradient(135deg,rgba(247,244,255,0.95),rgba(255,255,255,0.98))] no-underline shadow-[0_8px_24px_rgba(23,23,28,0.04)]"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--dl-color-bg-brand)]">
        <DailyIcon name="plus" size={28} className="brightness-0 invert" />
      </span>
    </TextLink>
  );
}
