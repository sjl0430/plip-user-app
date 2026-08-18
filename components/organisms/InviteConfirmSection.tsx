import { TextLink } from "@/components/atoms";
import { RoomInfoRow } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";

type InviteConfirmSectionProps = {
  agit: UiAgit;
};

export function InviteConfirmSection({ agit }: InviteConfirmSectionProps) {
  const maxMembers = agit.maxMembers ?? agit.memberCount;

  return (
    <section className="flex w-full flex-col gap-3.5">
      <div className="dl-panel dl-panel--subtle">
        <RoomInfoRow icon="link" title="비공개 방 초대" description="초대 링크가 유효합니다" />
      </div>

      <h2 className="dl-title">{agit.name}</h2>
      <p className="dl-subtitle">{agit.description}</p>

      <div className="dl-panel dl-panel--stack">
        <RoomInfoRow
          icon="users"
          title={`${agit.memberCount} / ${maxMembers}명`}
          description={`방장 ${agit.ownerName ?? "방장"}`}
        />
        <RoomInfoRow
          icon="video"
          title={`토픽 ${agit.topicCount}개`}
          description={agit.topicSummary ?? "초대된 방의 토픽"}
        />
      </div>

      <div className="dl-panel dl-panel--subtle">
        <p className="dl-notice-title">참여 전 확인</p>
        <p className="dl-notice-body">
          이 링크는 방장이 재발급하면 사용할 수 없습니다. 참여 후 방별 프로필을 선택합니다.
        </p>
      </div>

      <div className="dl-actions">
        <TextLink href={ROUTES.agit.profile(agit.id)} className="dl-btn dl-btn--primary no-underline">
          초대 수락하기
        </TextLink>
        <TextLink href={ROUTES.agit.root} className="dl-btn dl-btn--secondary no-underline">
          나중에 하기
        </TextLink>
      </div>
    </section>
  );
}
