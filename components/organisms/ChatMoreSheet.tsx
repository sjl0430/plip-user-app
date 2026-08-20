"use client";

import { DailyIcon, TextLink } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";
import { ROUTES } from "@/config/routes";

type ChatMoreSheetProps = {
  agitId: string;
  open: boolean;
  notify: boolean;
  onClose: () => void;
  onToggleNotify: () => void;
};

const MENU = [
  {
    id: "poll",
    title: "투표 만들기",
    description: "방 멤버와 빠르게 의견을 모읍니다",
    icon: "list" as const,
    href: (id: string) => ROUTES.agit.poll(id),
  },
  {
    id: "members",
    title: "멤버 보기",
    description: "참여 중인 멤버와 권한 확인",
    icon: "users" as const,
    href: (id: string) => ROUTES.agit.members(id),
  },
  {
    id: "manage",
    title: "방 관리",
    description: "초대·공개·안전 설정",
    icon: "usersBrand" as const,
    href: (id: string) => ROUTES.agit.manage(id),
  },
  {
    id: "notifications",
    title: "알림 설정",
    description: "기능별·방별 알림 조정",
    icon: "bell" as const,
    href: () => ROUTES.mypage.notifications,
  },
] as const;

export function ChatMoreSheet({
  agitId,
  open,
  notify,
  onClose,
  onToggleNotify,
}: ChatMoreSheetProps) {
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={`dl-viewer-scrim ${visible ? "dl-viewer-scrim--open" : ""}`}
        aria-label="메뉴 닫기"
        onClick={onClose}
      />
      <div
        className={`dl-viewer-actions ${visible ? "dl-viewer-actions--open" : ""}`}
        role="dialog"
        aria-modal
        aria-label="채팅 더보기"
        aria-hidden={!visible}
      >
        <button type="button" className="dl-viewer-action" onClick={onToggleNotify}>
          <DailyIcon name="bell" size={24} />
          <span className="min-w-0 flex-1 text-left">
            <p className="dl-viewer-action__title">채팅 알림 {notify ? "끄기" : "켜기"}</p>
            <p className="dl-viewer-action__desc">
              {notify ? "새 메시지 푸시를 받지 않습니다" : "새 메시지 푸시를 받습니다"}
            </p>
          </span>
          <span className={`dl-viewer-action__chevron${notify ? "" : " opacity-40"}`} aria-hidden>
            {notify ? "ON" : "OFF"}
          </span>
        </button>

        {MENU.map((item) => (
          <TextLink
            key={item.id}
            href={item.href(agitId)}
            className="dl-viewer-action no-underline"
            onClick={onClose}
          >
            <DailyIcon name={item.icon} size={24} />
            <span className="min-w-0 flex-1 text-left">
              <p className="dl-viewer-action__title">{item.title}</p>
              <p className="dl-viewer-action__desc">{item.description}</p>
            </span>
            <span className="dl-viewer-action__chevron" aria-hidden>
              ›
            </span>
          </TextLink>
        ))}
      </div>
    </>
  );
}
