import { DailyIcon, TextLink } from "@/components/atoms";
import { RoomInfoRow } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import Image from "next/image";

type PublicRoomDetailProps = {
  agit: UiAgit;
};

export function PublicRoomDetail({ agit }: PublicRoomDetailProps) {
  const maxMembers = agit.maxMembers ?? agit.memberCount;
  const remaining = Math.max(0, maxMembers - agit.memberCount);

  return (
    <section className="flex w-full flex-col gap-3.5">
      <div className="dl-thumb">
        <Image
          src={agit.thumbnailSrc ?? "/plip/daily-loop/room-thumbnail.png"}
          alt=""
          fill
          className="object-cover"
          sizes="350px"
        />
        <DailyIcon name="video" size={32} className="dl-thumb__icon" />
      </div>

      <div className="dl-pills">
        {agit.category ? <span className="dl-pill dl-pill--brand">{agit.category}</span> : null}
        <span className="dl-pill">공개 방</span>
      </div>

      <h2 className="dl-title">{agit.name}</h2>
      <p className="dl-subtitle">{agit.description}</p>

      <div className="dl-panel dl-panel--stack">
        <RoomInfoRow
          icon="users"
          title={`${agit.memberCount} / ${maxMembers}명`}
          description={remaining > 0 ? `현재 ${remaining}자리 남음` : "정원이 가득 찼어요"}
        />
        <RoomInfoRow
          icon="video"
          title={`오늘 영상 ${agit.todayVideoCount ?? 0}개`}
          description={`토픽: ${agit.topicSummary ?? "자유"}`}
        />
      </div>

      <p className="dl-subtitle text-[12px] leading-[17px]">
        방장은 {agit.ownerName ?? "방장"} · 공개방은 바로 참여할 수 있어요.
      </p>

      <div className="dl-actions">
        <TextLink href={ROUTES.agit.profile(agit.id)} className="dl-btn dl-btn--primary no-underline">
          이 방에 참여하기
        </TextLink>
      </div>
    </section>
  );
}
