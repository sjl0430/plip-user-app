"use client";

import { DailyIcon, SubmitButton, TextLink } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { UiAgit } from "@/types/agit/ui";
import { useState } from "react";

type AgitMenuDrawerProps = {
  agit: UiAgit;
  open: boolean;
  onClose: () => void;
};

const MENU = [
  { id: "chat", label: "채팅", icon: "message" as const, href: (id: string) => ROUTES.agit.chat(id) },
  { id: "calendar", label: "캘린더", icon: "calendar" as const, href: (id: string) => ROUTES.agit.calendar(id) },
  { id: "members", label: "멤버 관리", icon: "users" as const, href: (id: string) => ROUTES.agit.members(id) },
  { id: "settings", label: "방 설정", icon: "usersBrand" as const, href: (id: string) => ROUTES.agit.manage(id) },
];

export function AgitMenuDrawer({ agit, open, onClose }: AgitMenuDrawerProps) {
  const { mounted, visible } = useOverlayTransition(open);
  const [copied, setCopied] = useState(false);

  async function copyInviteCode() {
    if (!agit.inviteCode) return;
    try {
      await navigator.clipboard.writeText(agit.inviteCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-[40] border-0 bg-[rgba(0,0,0,0.32)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="메뉴 닫기"
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-[41] flex h-dvh w-[min(310px,86vw)] flex-col gap-2.5 rounded-l-[24px] bg-[#fbfaff] px-6 pt-12 pb-6 [transition:transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          visible ? "[transform:translateX(0)]" : "[transform:translateX(100%)]",
        )}
        aria-label="아지트 메뉴"
        aria-hidden={!visible}
      >
        <div className="flex items-center justify-between min-h-[48px]">
          <h2 className="m-0 text-[22px] font-bold text-[#1f1c29]">{agit.name}</h2>
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-[6px] min-h-[88px] p-[16px] rounded-[16px] bg-[#f2edff]">
          <p className="m-0 text-[15px] font-semibold text-[#1f1c29]">{agit.name}</p>
          <p className="m-0 text-xs text-[#756e8a]">
            {agit.memberCount}
            {agit.maxMembers ? `/${agit.maxMembers}` : ""}명 · 방장 {agit.ownerName ?? "안지민"}
          </p>
        </div>

        {agit.inviteCode ? (
          <div className="flex min-h-[52px] items-center justify-between gap-[12px] p-[12px_14px] border border-[#e3e0ed] rounded-[14px] bg-[#fff]">
            <div className="flex min-w-0 items-center gap-[14px]">
              <DailyIcon name="link" size={24} />
              <p className="m-0 overflow-hidden text-sm font-semibold tracking-[0.06em] text-[#262433] [text-overflow:ellipsis] whitespace-nowrap">{agit.inviteCode}</p>
            </div>
            <button type="button" className="inline-flex items-center justify-center h-[28px] rounded-[14px] p-[0_12px] text-xs font-semibold leading-none bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)]" onClick={copyInviteCode}>
              {copied ? "복사됨" : "복사"}
            </button>
          </div>
        ) : null}

        {MENU.map((item) => (
          <TextLink key={item.id} href={item.href(agit.id)} className="flex min-h-[52px] items-center gap-[14px] p-[12px_14px] border border-[#e3e0ed] rounded-[14px] bg-[#fff] !text-[#262433] text-sm font-semibold !no-underline" onClick={onClose}>
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
