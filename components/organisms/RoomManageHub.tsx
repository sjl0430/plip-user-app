import { DailyIcon, TextLink } from "@/components/atoms";
import { MemberManageRow } from "@/components/molecules/MemberManageRow";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";

type RoomManageHubProps = {
  azit: UiAzit;
};

const TILES = [
  {
    href: "info",
    title: "방 정보",
    description: "제목·소개·정원 설정",
    icon: "image" as const,
    tone: "brand" as const,
  },
  {
    href: "topics",
    title: "토픽 관리",
    description: "진행 날짜·등록 규칙",
    icon: "list" as const,
    tone: "brand" as const,
  },
  {
    href: "members",
    title: "멤버 관리",
    description: "추방·방장 위임",
    icon: "users" as const,
    tone: "danger" as const,
  },
  {
    href: "invite",
    title: "초대 링크",
    description: "복사·재발급",
    icon: "link" as const,
    tone: "brand" as const,
  },
];

export function RoomManageHub({ azit }: RoomManageHubProps) {
  const hrefs = {
    info: ROUTES.azit.profile(azit.id),
    topics: ROUTES.azit.topics(azit.id),
    members: ROUTES.azit.members(azit.id),
    invite: ROUTES.azit.invite(azit.id),
  };

  const memberLabel = azit.maxMembers ? `${azit.memberCount}/${azit.maxMembers}명` : `${azit.memberCount}명`;
  const visibilityLabel = azit.visibility === "private" ? "비공개" : "공개";

  return (
    <section className="dl-manage-hub" aria-label="방 관리">
      <NoticeCard
        tone="brand"
        className="dl-notice-card--summary"
        title={azit.name}
        body={`${memberLabel} · ${visibilityLabel} 아지트`}
      />

      <div className="dl-manage-grid">
        {TILES.map((tile) => (
          <TextLink
            key={tile.title}
            href={hrefs[tile.href as keyof typeof hrefs]}
            className={`dl-manage-tile dl-manage-tile--${tile.tone} no-underline`}
          >
            <span className="dl-manage-tile__icon" aria-hidden>
              <DailyIcon name={tile.icon} size={16} />
            </span>
            <p className="dl-manage-tile__title">{tile.title}</p>
            <p className="dl-manage-tile__desc">{tile.description}</p>
          </TextLink>
        ))}
      </div>

      <h2 className="dl-manage-hub__section-title">멤버</h2>
      <MemberManageRow
        name={azit.ownerName ?? "안지민"}
        meta="새벽 루틴 · 오늘 참여"
        host
        showMenu
        variant="hub"
      />
      <NoticeCard
        tone="danger"
        className="dl-notice-card--compact-danger"
        title="토픽 삭제 제한"
        body="등록 영상이 없는 토픽만 삭제할 수 있어요."
      />
    </section>
  );
}
