import { TextLink } from "@/components/atoms";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { CreateRoomAccessForm } from "@/components/organisms/CreateRoomAccessForm";
import { CreateRoomBasicForm } from "@/components/organisms/CreateRoomBasicForm";
import { InviteConfirmSection } from "@/components/organisms/InviteConfirmSection";
import { JoinCompleteSection } from "@/components/organisms/JoinCompleteSection";
import { PublicRoomDetail } from "@/components/organisms/PublicRoomDetail";
import { RoomProfileSelect } from "@/components/organisms/RoomProfileSelect";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

function RoomMissing({ backHref = ROUTES.agit.root }: { backHref?: string }) {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
      <TextLink href={backHref} className="dl-link">
        목록으로
      </TextLink>
    </DailyLoopAuthTemplate>
  );
}

export function PublicRoomTemplate({ agitId }: { agitId: string }) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">R01 · PUBLIC ROOM</p>
      <AuthTopBar title="방 정보" backHref={ROUTES.agit.root} />
      <PublicRoomDetail agit={agit} />
    </DailyLoopAuthTemplate>
  );
}

export function InviteConfirmTemplate({ agitId }: { agitId: string }) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">R02 · PRIVATE INVITE</p>
      <AuthTopBar title="초대 확인" backHref={ROUTES.agit.root} />
      <div className="h-2" />
      <InviteConfirmSection agit={agit} />
    </DailyLoopAuthTemplate>
  );
}

export function CreateRoomBasicTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="아지트 만들기" backHref={ROUTES.agit.root} step="1 / 2 · 기본 정보" />
      <CreateRoomBasicForm />
    </DailyLoopAuthTemplate>
  );
}

export function CreateRoomAccessTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="아지트 만들기" backHref={ROUTES.agit.create} step="2 / 2 · 프로필" />
      <CreateRoomAccessForm />
    </DailyLoopAuthTemplate>
  );
}

export function RoomProfileTemplate({ agitId }: { agitId: string }) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">R05 · ROOM PROFILE</p>
      <AuthTopBar title="이 방에서 사용할 프로필" backHref={ROUTES.agit.enter(agitId)} />
      <h2 className="dl-title dl-title--section">프로필을 선택해주세요</h2>
      <p className="dl-subtitle">한 유저는 한 방에서 하나의 프로필만 사용합니다.</p>
      <RoomProfileSelect agitId={agitId} />
    </DailyLoopAuthTemplate>
  );
}

export function JoinCompleteTemplate({ agitId }: { agitId: string }) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;

  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">R06 · JOIN COMPLETE</p>
      <div className="h-[42px]" />
      <JoinCompleteSection agit={agit} />
    </DailyLoopAuthTemplate>
  );
}

export function AgitEnterFlowTemplate({ agitId }: { agitId: string }) {
  const agit = getAgitById(agitId);
  if (!agit) return <RoomMissing />;
  if (agit.visibility === "private") {
    return <InviteConfirmTemplate agitId={agitId} />;
  }
  return <PublicRoomTemplate agitId={agitId} />;
}
