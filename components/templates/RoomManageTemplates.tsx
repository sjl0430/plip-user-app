import { TextLink } from "@/components/atoms";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { InvitesSafetySection } from "@/components/organisms/InvitesSafetySection";
import { MembersPermissionsSection } from "@/components/organisms/MembersPermissionsSection";
import { RoomManageHub } from "@/components/organisms/RoomManageHub";
import { TopicsLayoutSection } from "@/components/organisms/TopicsLayoutSection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

type AzitIdProps = { azitId: string };

function RoomMissing() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
      <TextLink href={ROUTES.azit.root} className="dl-link">
        목록으로
      </TextLink>
    </DailyLoopAuthTemplate>
  );
}

export function RoomManageHubTemplate({ azitId }: AzitIdProps) {
  const azit = getAzitById(azitId);
  if (!azit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="방 관리" backHref={ROUTES.azit.detail(azit.id)} />
      <RoomManageHub azit={azit} />
    </DailyLoopAuthTemplate>
  );
}

export function TopicsLayoutTemplate({ azitId }: AzitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="토픽 만들기" backHref={ROUTES.azit.manage(azitId)} />
      <TopicsLayoutSection />
    </DailyLoopAuthTemplate>
  );
}

export function MembersPermissionsTemplate({ azitId }: AzitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="멤버 관리" backHref={ROUTES.azit.manage(azitId)} />
      <p className="dl-subtitle">4 / 5명 · 방장만 권한을 변경할 수 있어요</p>
      <MembersPermissionsSection />
    </DailyLoopAuthTemplate>
  );
}

export function InvitesSafetyTemplate({ azitId }: AzitIdProps) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">03 · SAFETY</p>
      <AuthTopBar title="초대 및 안전" backHref={ROUTES.azit.manage(azitId)} step="03" />
      <InvitesSafetySection />
    </DailyLoopAuthTemplate>
  );
}
