import { TextLink } from "@/components/atoms";
import {
  AzitChatSection,
  AzitSearchSection,
} from "@/components/organisms/AzitSubSections";
import { AzitDetailSection } from "@/components/organisms/AzitDetailSection";
import { AzitListSection } from "@/components/organisms/AzitListSection";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

export function AzitListTemplate() {
  return (
    <AppChromeTemplate activeTab="azit" variant="light">
      <AzitListSection />
    </AppChromeTemplate>
  );
}

export function AzitDetailTemplate({ azitId }: { azitId: string }) {
  return (
    <AppChromeTemplate activeTab="azit" variant="light">
      <AzitDetailSection azitId={azitId} />
    </AppChromeTemplate>
  );
}

export { AzitEnterFlowTemplate as AzitEnterTemplate } from "./RoomFlowTemplates";

export {
  InvitesSafetyTemplate as AzitSafetyTemplate,
  MembersPermissionsTemplate as AzitMembersTemplate,
  RoomManageHubTemplate as AzitManageTemplate,
  TopicCreateTemplate as AzitTopicCreateTemplate,
  TopicsLayoutTemplate as AzitTopicsTemplate,
} from "./RoomManageTemplates";

export function AzitChatTemplate({ azitId }: { azitId: string }) {
  if (!getAzitById(azitId)) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.azit.root} className="dl-link">
          목록으로
        </TextLink>
      </DailyLoopAuthTemplate>
    );
  }

  return (
    <AppChromeTemplate activeTab="azit" variant="light">
      <AzitChatSection azitId={azitId} />
    </AppChromeTemplate>
  );
}

export function AzitSearchTemplate() {
  return (
    <AppChromeTemplate activeTab="azit" variant="light" showNav={false}>
      <AzitSearchSection />
    </AppChromeTemplate>
  );
}
