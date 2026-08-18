import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { NoticeCard } from "@/components/molecules/NoticeCard";
import { ROUTES } from "@/config/routes";
import type { UiAzit } from "@/types/azit/ui";

type AzitMenuDrawerProps = {
  azit: UiAzit;
  open: boolean;
  onClose: () => void;
};

const MENU = [
  { id: "chat", label: "채팅", icon: "message" as const, href: (id: string) => ROUTES.azit.chat(id) },
  { id: "calendar", label: "캘린더", icon: "calendar" as const, href: (id: string) => ROUTES.azit.calendar(id) },
  { id: "members", label: "멤버 관리", icon: "users" as const, href: (id: string) => ROUTES.azit.members(id) },
  { id: "invite", label: "초대 링크 복사", icon: "link" as const, href: (id: string) => ROUTES.azit.invite(id) },
  { id: "settings", label: "방 설정", icon: "usersBrand" as const, href: (id: string) => ROUTES.azit.manage(id) },
];

export function AzitMenuDrawer({ azit, open, onClose }: AzitMenuDrawerProps) {
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
          title={azit.name}
          body={`${azit.memberCount}${azit.maxMembers ? `/${azit.maxMembers}` : ""}명 · 방장 ${azit.ownerName ?? "안지민"}`}
        />
        {MENU.map((item) => (
          <TextLink key={item.id} href={item.href(azit.id)} className="dl-drawer__row">
            <DailyIcon name={item.icon} size={24} />
            {item.label}
          </TextLink>
        ))}
        <SubmitButton variant="brand">초대 링크 복사</SubmitButton>
      </aside>
    </>
  );
}
