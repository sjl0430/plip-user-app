import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import Image from "next/image";

type AgitListRowProps = {
  agit: UiAgit;
};

export function AgitListRow({ agit }: AgitListRowProps) {
  return (
    <article className="flex items-center gap-[10px] min-h-[92px] p-[12px] border border-[var(--dl-color-border-default)] rounded-[18px] bg-[var(--dl-color-bg-elevated)] shadow-[0_8px_24px_rgba(23,_23,_28,_0.04)]">
      <TextLink href={ROUTES.agit.detail(agit.id)} className="flex min-w-0 flex-1 items-center gap-[12px] text-[inherit] no-underline">
        <div className="relative w-[56px] h-[56px] shrink-0 overflow-hidden rounded-[14px] shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.18)]" style={{ background: agit.coverGradient }}>
          {agit.thumbnailSrc ? (
            <Image src={agit.thumbnailSrc} alt="" width={56} height={56} className="w-full h-full object-cover" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <p className="m-0 overflow-hidden text-[15px] font-semibold leading-[1.25] text-[var(--dl-color-text-primary)] [text-overflow:ellipsis] whitespace-nowrap">{agit.name}</p>
          {agit.topicSummary ? (
            <p className="m-[4px_0_0] overflow-hidden text-[11px] font-semibold text-[var(--dl-color-text-brand)] [text-overflow:ellipsis] whitespace-nowrap">
              {agit.topicSummary.startsWith("#")
                ? agit.topicSummary
                : `#${agit.topicSummary.replace(/\s+/g, "_")}`}
            </p>
          ) : null}
        </div>
      </TextLink>

      <div className="flex shrink-0 flex-row gap-[8px]">
        <TextLink
          href={ROUTES.agit.chat(agit.id)}
          className="relative grid w-[40px] h-[40px] place-items-center border border-[var(--dl-color-border-default)] rounded-[12px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-primary)] no-underline"
          aria-label={`${agit.name} 채팅`}
        >
          <DailyIcon name="message" size={20} />
          {agit.hasNewChat ? <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] border border-[#fff] rounded-[999px] bg-[var(--dl-color-bg-brand)]" aria-hidden /> : null}
        </TextLink>
        <TextLink
          href={ROUTES.agit.upload(agit.id)}
          className="relative grid w-[40px] h-[40px] place-items-center border border-[var(--dl-color-border-default)] rounded-[12px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-primary)] no-underline"
          aria-label={`${agit.name} 촬영`}
        >
          <DailyIcon name="camera" size={20} />
          {agit.hasTodayTopic ? <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] border border-[#fff] rounded-[999px] bg-[var(--dl-color-bg-brand)]" aria-hidden /> : null}
        </TextLink>
      </div>
    </article>
  );
}
