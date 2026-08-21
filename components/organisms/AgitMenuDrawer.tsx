"use client";

import { leaveAgitAction } from "@/actions/agitActions";
import { DailyIcon, Separator, TextLink } from "@/components/atoms";
import { AGIT_TOPICS } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { toast } from "@/components/ui/toast";
import { copyText } from "@/lib/copyText";
import { cn } from "@/lib/utils";
import type { UiAgit } from "@/types/agit/ui";
import { Check, Copy, Link2, LogOut, Settings, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AgitMenuDrawerProps = {
  agit: UiAgit;
  open: boolean;
  onClose: () => void;
};

const MENU = [
  { id: "chat" as const, label: "채팅", href: (id: string) => ROUTES.agit.chat(id) },
  { id: "members" as const, label: "멤버리스트", href: (id: string) => ROUTES.agit.members(id) },
  { id: "profile" as const, label: "내프로필관리", href: (id: string) => ROUTES.agit.profile(id) },
  { id: "manage" as const, label: "아지트관리", href: (id: string) => ROUTES.agit.manage(id) },
];

function MenuItemIcon({ id }: { id: (typeof MENU)[number]["id"] }) {
  if (id === "chat") {
    return <DailyIcon name="message" size={24} />;
  }
  if (id === "members") {
    return <DailyIcon name="users" size={24} />;
  }
  if (id === "profile") {
    return <UserRoundCog className="size-6 shrink-0 text-[#262433]" strokeWidth={2} />;
  }
  return <Settings className="size-6 shrink-0 text-[#262433]" strokeWidth={2} />;
}

export function AgitMenuDrawer({ agit, open, onClose }: AgitMenuDrawerProps) {
  const { mounted, visible } = useOverlayTransition(open);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const inviteCode = agit.inviteCode?.trim() ?? "";

  async function copyInviteCode() {
    if (!inviteCode) return;
    const ok = await copyText(inviteCode);
    setCopied(ok);
  }

  async function handleLeave() {
    if (leaving) return;
    setLeaving(true);
    const result = await leaveAgitAction(agit.id);
    if (!result.ok) {
      toast.add({
        type: "error",
        title: "아지트를 나가지 못했습니다",
        description: result.error,
      });
      setLeaving(false);
      return;
    }
    onClose();
    toast.add({
      type: "success",
      title: "아지트에서 나갔습니다",
    });
    router.push(ROUTES.agit.root);
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
        <div className="flex shrink-0 items-center justify-between min-h-[48px]">
          <h2 className="m-0 text-[22px] font-bold text-[#1f1c29]">{agit.name}</h2>
          <button type="button" className="grid w-[44px] h-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]" aria-label="닫기" onClick={onClose}>
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <button
          type="button"
          className="flex min-h-[32px] w-full shrink-0 items-center justify-between gap-2 p-[6px_10px] border border-[#e3e0ed] rounded-[10px] bg-[#fff] text-left cursor-pointer disabled:cursor-default"
          onClick={copyInviteCode}
          disabled={!inviteCode}
          aria-label="초대코드 복사"
        >
          <div className="flex min-w-0 items-center gap-2">
            <Link2 className="size-3.5 shrink-0 text-[#262433]" strokeWidth={2} />
            <p className="m-0 overflow-hidden text-xs font-medium tracking-[0.04em] text-[#262433] [text-overflow:ellipsis] whitespace-nowrap">
              {inviteCode || "초대코드"}
            </p>
          </div>
          {copied ? (
            <Check className="size-3.5 shrink-0 text-[var(--dl-color-text-brand)]" strokeWidth={2} aria-hidden />
          ) : (
            <Copy className="size-3.5 shrink-0 text-[var(--dl-color-text-brand)]" strokeWidth={2} aria-hidden />
          )}
          <span className="sr-only">{copied ? "복사됨" : "복사"}</span>
        </button>

        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto">
          <div className="flex flex-col gap-1" aria-label="진행중인 토픽">
            {AGIT_TOPICS.map((topic) => (
              <p key={topic.id} className="m-0 px-1 text-sm font-medium text-[#262433]">
                {topic.title}
              </p>
            ))}
          </div>

          <Separator className="!m-1 !border-[#e3e0ed]" />

          {MENU.map((item) => (
            <TextLink key={item.id} href={item.href(agit.id)} className="flex min-h-[52px] items-center gap-[14px] p-[12px_14px] border border-[#e3e0ed] rounded-[14px] bg-[#fff] !text-[#262433] text-sm font-semibold !no-underline" onClick={onClose}>
              <MenuItemIcon id={item.id} />
              {item.label}
            </TextLink>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            className="grid w-[44px] h-[44px] place-items-center rounded-[var(--dl-radius-md)] border border-[#e3e0ed] bg-[#fff] cursor-pointer disabled:opacity-50"
            aria-label="아지트 나가기"
            disabled={leaving}
            onClick={handleLeave}
          >
            <LogOut className="size-5 text-[#d84545]" strokeWidth={2} />
          </button>
        </div>
      </aside>
    </>
  );
}
