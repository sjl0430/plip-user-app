"use client";

import { leaveAgitAction } from "@/actions/agitActions";
import { listTopicsByStatusAction } from "@/actions/topicActions";
import { DailyIcon, Separator, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { toast } from "@/components/ui/toast";
import { copyText } from "@/lib/copyText";
import { cn } from "@/lib/utils";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicListItem } from "@/types/topic/ui";
import { Check, Copy, Link2, LogOut, Settings, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AgitMenuDrawerProps = {
  agit: UiAgit;
  open: boolean;
  onClose: () => void;
};

const MENU = [
  {
    id: "topics" as const,
    label: "토픽관리",
    href: (id: string) => ROUTES.agit.topics(id),
    hostOnly: false,
  },
  { id: "chat" as const, label: "채팅", href: (id: string) => ROUTES.agit.chat(id), hostOnly: false },
  {
    id: "members" as const,
    label: "멤버리스트",
    href: (id: string) => ROUTES.agit.members(id),
    hostOnly: false,
  },
  {
    id: "profile" as const,
    label: "내프로필관리",
    href: (id: string) => ROUTES.agit.profileEdit(id),
    hostOnly: false,
  },
  {
    id: "manage" as const,
    label: "아지트관리",
    href: (id: string) => ROUTES.agit.manage(id),
    hostOnly: true,
  },
];

function MenuItemIcon({ id }: { id: (typeof MENU)[number]["id"] }) {
  if (id === "topics") {
    return <DailyIcon name="list" size={24} />;
  }
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
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [ongoingTopics, setOngoingTopics] = useState<UiTopicListItem[]>([]);
  const inviteCode = agit.inviteCode?.trim() ?? "";
  const menuItems = MENU.filter((item) => !item.hostOnly || agit.myRole === "HOST");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    listTopicsByStatusAction(agit.id, "ONGOING", 3).then((result) => {
      if (cancelled) return;
      setOngoingTopics(result.ok ? result.data : []);
    });
    return () => {
      cancelled = true;
    };
  }, [open, agit.id]);

  async function copyInviteCode() {
    if (!inviteCode) return;
    const ok = await copyText(inviteCode);
    setCopied(ok);
  }

  function handleClose() {
    setConfirmLeave(false);
    onClose();
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
    handleClose();
    toast.add({
      type: "success",
      title: "아지트에서 나갔습니다",
    });
    router.push(ROUTES.agit.root);
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[40] md:absolute">
      <button
        type="button"
        className={cn(
          "absolute inset-0 border-0 bg-[rgba(0,0,0,0.32)] [transition:opacity_280ms_ease] motion-reduce:transition-none",
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="메뉴 닫기"
        onClick={handleClose}
      />
      <aside
        className={cn(
          "absolute top-0 right-0 bottom-0 z-[1] flex w-[min(310px,86%)] flex-col gap-2.5 overflow-hidden rounded-l-[24px] bg-[#fbfaff] px-6 pt-12 pb-[calc(1.25rem+80px)] md:pb-5 [transition:transform_280ms_cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          visible ? "[transform:translateX(0)]" : "[transform:translateX(100%)]",
        )}
        aria-label="아지트 메뉴"
        aria-hidden={!visible}
      >
        <div className="flex min-h-[48px] shrink-0 items-center justify-between">
          <h2 className="m-0 text-[22px] font-bold text-[#1f1c29]">{agit.name}</h2>
          <button
            type="button"
            className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)]"
            aria-label="닫기"
            onClick={handleClose}
          >
            <DailyIcon name="x" size={20} />
          </button>
        </div>

        <button
          type="button"
          className="flex min-h-[32px] w-full shrink-0 cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-[#e3e0ed] bg-[#fff] p-[6px_10px] text-left disabled:cursor-default"
          onClick={copyInviteCode}
          disabled={!inviteCode}
          aria-label="초대코드 복사"
        >
          <div className="flex min-w-0 items-center gap-2">
            <Link2 className="size-3.5 shrink-0 text-[#262433]" strokeWidth={2} />
            <p className="m-0 overflow-hidden text-xs font-medium tracking-[0.04em] text-[#262433] whitespace-nowrap [text-overflow:ellipsis]">
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
            <div className="flex min-h-[32px] items-center justify-between gap-2 px-1">
              <p className="m-0 text-xs font-semibold text-[#756e8a]">진행중</p>
              <TextLink
                href={ROUTES.agit.topics(agit.id)}
                className="text-xs font-semibold !text-[var(--dl-color-text-brand)] !no-underline"
                onClick={handleClose}
              >
                더보기
              </TextLink>
            </div>
            {ongoingTopics.length === 0 ? (
              <p className="m-0 px-1 text-sm font-medium text-[#756e8a]">아직 토픽이 없어요</p>
            ) : (
              ongoingTopics.map((topic) => (
                <p key={topic.id} className="m-0 px-1 text-sm font-medium text-[#262433]">
                  {topic.title || "제목 없음"}
                </p>
              ))
            )}
          </div>

          <Separator className="!m-1 !border-[#e3e0ed]" />

          {menuItems.map((item) => (
            <TextLink
              key={item.id}
              href={item.href(agit.id)}
              className="flex min-h-[52px] items-center gap-[14px] rounded-[14px] border border-[#e3e0ed] bg-[#fff] p-[12px_14px] text-sm font-semibold !text-[#262433] !no-underline"
              onClick={handleClose}
            >
              <MenuItemIcon id={item.id} />
              {item.label}
            </TextLink>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            className="grid h-[44px] w-[44px] cursor-pointer place-items-center rounded-[var(--dl-radius-md)] border border-[#e3e0ed] bg-[#fff] disabled:opacity-50"
            aria-label="아지트 나가기"
            disabled={leaving}
            onClick={() => setConfirmLeave(true)}
          >
            <LogOut className="size-5 text-[#d84545]" strokeWidth={2} />
          </button>
        </div>
      </aside>

      {confirmLeave ? (
        <div className="absolute inset-0 z-[2] flex items-center justify-center p-6">
          <button
            type="button"
            className="absolute inset-0 border-0 bg-[rgba(0,0,0,0.32)]"
            aria-label="취소"
            onClick={() => setConfirmLeave(false)}
          />
          <div
            role="dialog"
            aria-modal
            aria-labelledby="agit-leave-title"
            className="relative z-[1] w-full max-w-[280px] rounded-[20px] border border-[#e3e0ed] bg-[#fbfaff] p-5 shadow-[0_8px_24px_rgba(31,28,41,0.12)]"
          >
            <p id="agit-leave-title" className="m-0 text-base font-semibold text-[#1f1c29]">
              아지트에서 나가시겠어요?
            </p>
            <p className="m-[8px_0_0] text-xs text-[#756e8a]">나가면 목록에서 이 아지트가 사라집니다.</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="flex h-11 flex-1 items-center justify-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-surface)] text-sm font-medium text-[#262433]"
                onClick={() => setConfirmLeave(false)}
              >
                취소
              </button>
              <button
                type="button"
                className="flex h-11 flex-1 items-center justify-center rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-danger)] text-sm font-medium text-[var(--dl-color-text-danger)] disabled:opacity-50"
                disabled={leaving}
                onClick={handleLeave}
              >
                {leaving ? "나가는 중..." : "나가기"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
