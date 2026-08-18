import { DailyIcon, TextLink } from "@/components/atoms";
import { MemberManageRow } from "@/components/molecules/MemberManageRow";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";

type RoomManageHubProps = {
  azit: UiAzit;
};

const TILES = [
  { href: "info", title: "방 정보", description: "제목·소개·정원 설정", icon: "image" as const },
  { href: "topics", title: "토픽 관리", description: "진행 날짜·등록 규칙", icon: "list" as const },
  { href: "members", title: "멤버 관리", description: "추방·방장 위임", icon: "users" as const },
  { href: "invite", title: "초대 링크", description: "복사·재발급", icon: "link" as const },
];

export function RoomManageHub({ azit }: RoomManageHubProps) {
  const hrefs = {
    info: ROUTES.azit.manage(azit.id),
    topics: ROUTES.azit.topics(azit.id),
    members: ROUTES.azit.members(azit.id),
    invite: ROUTES.azit.safety(azit.id),
  };

  return (
    <section className="flex w-full flex-col gap-4" aria-label="방 관리">
      <p className="m-0 text-[12px] text-[var(--dl-color-text-secondary)]">
        방장 · {azit.ownerName ?? "안지민"}
      </p>

      <NoticeCard
        title={azit.name}
        body={`${azit.memberCount}${azit.maxMembers ? `/${azit.maxMembers}` : ""}명 · ${azit.visibility === "private" ? "비공개" : "공개"} 아지트`}
      />

      <div className="dl-manage-grid">
        {TILES.map((tile) => (
          <TextLink key={tile.title} href={hrefs[tile.href as keyof typeof hrefs]} className="dl-manage-tile">
            <span className="dl-manage-tile__icon">
              <DailyIcon name={tile.icon} size={16} />
            </span>
            <p className="dl-notice-card__title">{tile.title}</p>
            <p className="dl-notice-card__body">{tile.description}</p>
          </TextLink>
        ))}
      </div>

      <h2 className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">멤버</h2>
      <MemberManageRow name={azit.ownerName ?? "안지민"} meta="방장 · 오늘 참여" host />
      <NoticeCard title="토픽 삭제 제한" body="등록 영상이 없는 토픽만 삭제할 수 있어요." />
    </section>
  );
}
