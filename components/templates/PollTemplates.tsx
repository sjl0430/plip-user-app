import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { PollEditor } from "@/components/organisms/PollEditor";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

type PollTemplateProps = {
  azitId: string;
};

export function PollCreateTemplate({ azitId }: PollTemplateProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">POLL · CREATE</p>
      <AuthTopBar title="새 투표" backHref={ROUTES.azit.chat(azitId)} step="작성" />
      <PollEditor azitId={azitId} mode="create" />
    </DailyLoopAuthTemplate>
  );
}

export function PollEditTemplate({ azitId }: PollTemplateProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">POLL · EDIT</p>
      <AuthTopBar
        title="투표 수정"
        backHref={ROUTES.azit.chat(azitId)}
        trailing={<span className="dl-badge">초안</span>}
      />
      <PollEditor azitId={azitId} mode="edit" />
    </DailyLoopAuthTemplate>
  );
}
