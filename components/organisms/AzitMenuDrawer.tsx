"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
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
          <p className="dl-drawer__summary-title">{azit.name}</p>
          <p className="dl-drawer__summary-body">
            {azit.memberCount}
            {azit.maxMembers ? `/${azit.maxMembers}` : ""}명 · 방장 {azit.ownerName ?? "안지민"}
          </p>
        </div>

        {MENU.map((item) => (
          <TextLink key={item.id} href={item.href(azit.id)} className="dl-drawer__menu-row" onClick={onClose}>
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
