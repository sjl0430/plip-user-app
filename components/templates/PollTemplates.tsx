import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { PollEditor } from "@/components/organisms/PollEditor";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

type PollTemplateProps = {
  agitId: string;
};

export function PollCreateTemplate({ agitId }: PollTemplateProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">POLL · CREATE</p>
      <AuthTopBar title="새 투표" backHref={ROUTES.agit.chat(agitId)} step="작성" />
      <PollEditor agitId={agitId} mode="create" />
    </DailyLoopAuthTemplate>
  );
}

export function PollEditTemplate({ agitId }: PollTemplateProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">POLL · EDIT</p>
      <AuthTopBar
        title="투표 수정"
        backHref={ROUTES.agit.chat(agitId)}
        trailing={<span className="inline-flex items-center justify-center h-[28px] rounded-[14px] p-[0_12px] text-xs font-semibold leading-none bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)]">초안</span>}
      />
      <PollEditor agitId={agitId} mode="edit" />
    </DailyLoopAuthTemplate>
  );
}
