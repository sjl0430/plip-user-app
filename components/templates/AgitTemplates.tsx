import { TextLink } from "@/components/atoms";
import {
  AgitChatSection,
  AgitSearchSection,
} from "@/components/organisms/AgitSubSections";
import { AgitDetailSection } from "@/components/organisms/AgitDetailSection";
import { AgitListSection } from "@/components/organisms/AgitListSection";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

export function AgitListTemplate() {
  return (
    <AppChromeTemplate activeTab="agit" variant="light">
      <AgitListSection />
    </AppChromeTemplate>
  );
}

export function AgitDetailTemplate({ agitId }: { agitId: string }) {
  return (
    <AppChromeTemplate activeTab="agit" variant="light">
      <AgitDetailSection agitId={agitId} />
    </AppChromeTemplate>
  );
}

export { AgitEnterFlowTemplate as AgitEnterTemplate } from "./RoomFlowTemplates";

export {
  InvitesSafetyTemplate as AgitSafetyTemplate,
  MembersPermissionsTemplate as AgitMembersTemplate,
  RoomManageHubTemplate as AgitManageTemplate,
  TopicsLayoutTemplate as AgitTopicsTemplate,
} from "./RoomManageTemplates";

export function AgitChatTemplate({ agitId }: { agitId: string }) {
  if (!getAgitById(agitId)) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="dl-link">
          목록으로
        </TextLink>
      </DailyLoopAuthTemplate>
    );
  }

  return (
    <DailyLoopAuthTemplate>
      <AgitChatSection agitId={agitId} />
    </DailyLoopAuthTemplate>
  );
}

export function AgitSearchTemplate() {
  return (
    <AppChromeTemplate activeTab="agit" variant="light" showNav={false}>
      <AgitSearchSection />
    </AppChromeTemplate>
  );
}
