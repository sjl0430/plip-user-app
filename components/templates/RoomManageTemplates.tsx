import { DailyIcon, TextLink } from "@/components/atoms";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { InvitesSafetySection } from "@/components/organisms/InvitesSafetySection";
import { MembersPermissionsSection } from "@/components/organisms/MembersPermissionsSection";
import { RoomManageHub } from "@/components/organisms/RoomManageHub";
import { TopicCreateForm } from "@/components/organisms/TopicCreateForm";
import { TopicsLayoutSection } from "@/components/organisms/TopicsLayoutSection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type AgitIdProps = { agitId: string };

function RoomMissing() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
      <TextLink href={ROUTES.agit.root} className="dl-link">
        목록으로
      </TextLink>
    </DailyLoopAuthTemplate>
  );
}

export function RoomManageHubTemplate({ agitId }: AgitIdProps) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <div className="dl-manage-page px-6 pb-8 pt-3">
        <header className="dl-page-head">
          <TextLink href={ROUTES.agit.detail(agit.id)} className="dl-icon-sq no-underline" aria-label="뒤로">
            <DailyIcon name="chevronLeft" size={20} />
          </TextLink>
          <div className="dl-page-head__copy">
            <h1 className="dl-page-head__title">방 관리</h1>
            <p className="dl-manage-subtitle">방장 · {agit.ownerName ?? "안지민"}</p>
          </div>
        </header>
        <RoomManageHub agit={agit} />
      </div>
    </DailyLoopAuthTemplate>
  );
}

export function TopicsLayoutTemplate({ agitId }: AgitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="토픽 관리" backHref={ROUTES.agit.manage(agitId)} />
      <TopicsLayoutSection agitId={agitId} />
    </DailyLoopAuthTemplate>
  );
}

export function TopicCreateTemplate({ agitId }: AgitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar
        title="토픽 만들기"
        backHref={ROUTES.agit.topics(agitId)}
        step="토픽 진행 기간과 적용 아이템을 정합니다"
      />
      <TopicCreateForm />
    </DailyLoopAuthTemplate>
  );
}

export function MembersPermissionsTemplate({ agitId }: AgitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="멤버 관리" backHref={ROUTES.agit.manage(agitId)} />
      <p className="dl-subtitle">4 / 5명 · 방장만 권한을 변경할 수 있어요</p>
      <MembersPermissionsSection />
    </DailyLoopAuthTemplate>
  );
}

export function InvitesSafetyTemplate({ agitId }: AgitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">03 · SAFETY</p>
      <AuthTopBar title="초대 및 안전" backHref={ROUTES.agit.manage(agitId)} step="03" />
      <InvitesSafetySection />
    </DailyLoopAuthTemplate>
  );
}
