import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";

type AgitMenuDrawerProps = {
  agit: UiAgit;
  open: boolean;
  onClose: () => void;
};

const MENU = [
  { id: "chat", label: "채팅", icon: "message" as const, href: (id: string) => ROUTES.agit.chat(id) },
  { id: "calendar", label: "캘린더", icon: "calendar" as const, href: (id: string) => ROUTES.agit.calendar(id) },
  { id: "members", label: "멤버 관리", icon: "users" as const, href: (id: string) => ROUTES.agit.members(id) },
  { id: "invite", label: "초대 링크 복사", icon: "link" as const, href: (id: string) => ROUTES.agit.invite(id) },
  { id: "settings", label: "방 설정", icon: "usersBrand" as const, href: (id: string) => ROUTES.agit.manage(id) },
];

export function AgitMenuDrawer({ agit, open, onClose }: AgitMenuDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="dl-drawer-scrim" aria-label="메뉴 닫기" onClick={onClose} />
      <aside className="dl-drawer" aria-label="아지트 메뉴">
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-[22px] font-bold text-[var(--dl-color-text-primary)]">아지트 메뉴</h2>
          <button type="button" className="dl-icon-sq" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>
        <NoticeCard
          title={agit.name}
          body={`${agit.memberCount}${agit.maxMembers ? `/${agit.maxMembers}` : ""}명 · 방장 ${agit.ownerName ?? "안지민"}`}
        />
        {MENU.map((item) => (
          <TextLink key={item.id} href={item.href(agit.id)} className="dl-drawer__row">
            <DailyIcon name={item.icon} size={24} />
            {item.label}
          </TextLink>
        ))}
        <SubmitButton variant="brand">초대 링크 복사</SubmitButton>
      </aside>
    </>
  );
}
