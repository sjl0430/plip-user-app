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
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">방을 찾을 수 없습니다.</p>
      <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
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
      <div className="flex flex-col gap-[16px] px-6 pb-8 pt-3">
        <header className="flex items-start justify-between gap-[12px] gap-[10px] mb-[4px]">
          <TextLink href={ROUTES.agit.detail(agit.id)} className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] no-underline" aria-label="뒤로">
            <DailyIcon name="chevronLeft" size={20} />
          </TextLink>
          <div className="pt-[14px] min-w-0 flex-1">
            <h1 className="m-0 text-[26px] font-bold leading-[31px] text-[var(--dl-color-text-primary)] text-[24px] leading-[1.15]">방 관리</h1>
            <p className="m-[4px_0_0] text-xs font-medium text-[var(--dl-color-text-brand)]">방장 · {agit.ownerName ?? "안지민"}</p>
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
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">4 / 5명 · 방장만 권한을 변경할 수 있어요</p>
      <MembersPermissionsSection />
    </DailyLoopAuthTemplate>
  );
}

export function InvitesSafetyTemplate({ agitId }: AgitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">03 · SAFETY</p>
      <AuthTopBar title="초대 및 안전" backHref={ROUTES.agit.manage(agitId)} step="03" />
      <InvitesSafetySection />
    </DailyLoopAuthTemplate>
  );
}
