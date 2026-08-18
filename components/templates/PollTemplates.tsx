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
      <p className="dl-eyebrow">POLL · CREATE</p>
      <AuthTopBar title="새 투표" backHref={ROUTES.agit.chat(agitId)} step="작성" />
      <PollEditor agitId={agitId} mode="create" />
    </DailyLoopAuthTemplate>
  );
}

export function PollEditTemplate({ agitId }: PollTemplateProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">POLL · EDIT</p>
      <AuthTopBar
        title="투표 수정"
        backHref={ROUTES.agit.chat(agitId)}
        trailing={<span className="dl-badge">초안</span>}
      />
      <PollEditor agitId={agitId} mode="edit" />
    </DailyLoopAuthTemplate>
  );
}
