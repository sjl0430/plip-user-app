"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
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
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={`dl-drawer-scrim ${visible ? "dl-drawer-scrim--open" : ""}`}
        aria-label="메뉴 닫기"
        onClick={onClose}
      />
      <aside
        className={`dl-drawer dl-drawer--v14 ${visible ? "dl-drawer--open" : ""}`}
        aria-label="아지트 메뉴"
        aria-hidden={!visible}
      >
        <div className="dl-drawer__header">
          <h2 className="dl-drawer__title">아지트 메뉴</h2>
          <button type="button" className="dl-icon-sq" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <div className="dl-drawer__summary">
          <p className="dl-drawer__summary-title">{agit.name}</p>
          <p className="dl-drawer__summary-body">
            {agit.memberCount}
            {agit.maxMembers ? `/${agit.maxMembers}` : ""}명 · 방장 {agit.ownerName ?? "안지민"}
          </p>
        </div>

        {MENU.map((item) => (
          <TextLink key={item.id} href={item.href(agit.id)} className="dl-drawer__menu-row" onClick={onClose}>
            <DailyIcon name={item.icon} size={24} />
            {item.label}
          </TextLink>
        ))}

        <SubmitButton variant="outline" className="w-full">
          아지트 나가기
        </SubmitButton>
      </aside>
    </>
  );
}
