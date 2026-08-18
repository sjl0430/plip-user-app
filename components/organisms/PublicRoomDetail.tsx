import { DailyIcon, TextLink } from "@/components/atoms";
import { RoomInfoRow } from "@/components/molecules";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";
import Image from "next/image";

type PublicRoomDetailProps = {
  azit: UiAzit;
};

export function PublicRoomDetail({ azit }: PublicRoomDetailProps) {
  const maxMembers = azit.maxMembers ?? azit.memberCount;
  const remaining = Math.max(0, maxMembers - azit.memberCount);

  return (
    <section className="flex w-full flex-col gap-3.5">
      <div className="dl-thumb">
        <Image
          src={azit.thumbnailSrc ?? "/plip/daily-loop/room-thumbnail.png"}
          alt=""
          fill
          className="object-cover"
          sizes="350px"
        />
        <DailyIcon name="video" size={32} className="dl-thumb__icon" />
      </div>

      <div className="dl-pills">
        {azit.category ? <span className="dl-pill dl-pill--brand">{azit.category}</span> : null}
        <span className="dl-pill">공개 방</span>
      </div>

      <h2 className="dl-title">{azit.name}</h2>
      <p className="dl-subtitle">{azit.description}</p>

      <div className="dl-panel dl-panel--stack">
        <RoomInfoRow
          icon="users"
          title={`${azit.memberCount} / ${maxMembers}명`}
          description={remaining > 0 ? `현재 ${remaining}자리 남음` : "정원이 가득 찼어요"}
        />
        <RoomInfoRow
          icon="video"
          title={`오늘 영상 ${azit.todayVideoCount ?? 0}개`}
          description={`토픽: ${azit.topicSummary ?? "자유"}`}
        />
      </div>

      <p className="dl-subtitle text-[12px] leading-[17px]">
        방장은 {azit.ownerName ?? "방장"} · 공개방은 바로 참여할 수 있어요.
      </p>

      <div className="dl-actions">
        <TextLink href={ROUTES.azit.profile(azit.id)} className="dl-btn dl-btn--primary no-underline">
          이 방에 참여하기
        </TextLink>
      </div>
    </section>
  );
}
