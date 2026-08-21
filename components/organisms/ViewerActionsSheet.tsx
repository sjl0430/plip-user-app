"use client";

import { DailyIcon } from "@/components/atoms";
import { useOverlayTransition } from "@/hooks/useOverlayTransition";

type ViewerActionsSheetProps = {
  open: boolean;
  onClose: () => void;
  onMoveTopic: () => void;
};

const ACTIONS = [
  {
    id: "download",
    title: "영상 다운로드",
    description: "원본 파일을 기기에 저장합니다",
    icon: "download" as const,
    tone: "default" as const,
  },
  {
    id: "move",
    title: "토픽 이동",
    description: "다른 토픽으로 영상을 옮깁니다",
    icon: "upload" as const,
    tone: "default" as const,
  },
  {
    id: "delete",
    title: "영상 삭제",
    description: "삭제 후에는 복구할 수 없습니다",
    icon: "trash" as const,
    tone: "danger" as const,
  },
] as const;

export function ViewerActionsSheet({ open, onClose, onMoveTopic }: ViewerActionsSheetProps) {
  const { mounted, visible } = useOverlayTransition(open);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        className={`motion-reduce:transition-[none] fixed inset-0 z-[41] border-0 bg-[rgba(0,_0,_0,_0.32)] opacity-0 transition-[opacity_280ms_ease] ${visible ? "opacity-100 m-dlViewerScrimOpen" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`motion-reduce:transition-[none] fixed left-[50%] bottom-[96px] z-[42] flex w-[min(300px,_calc(100vw_-_48px))] flex-col gap-[8px] p-[12px] rounded-[20px] bg-[rgba(252,_251,_255,_0.98)] shadow-[0_8px_24px_rgba(0,_0,_0,_0.22)] opacity-0 [transform:translate(-50%,_12px)_scale(0.96)] transition-[opacity_280ms_ease,_transform_280ms_cubic-bezier(0.32,_0.72,_0,_1)] ${visible ? "opacity-100 [transform:translate(-50%,_0)_scale(1)] m-dlViewerActionsOpen" : ""}`}
        role="dialog"
        aria-modal
        aria-label="더보기 메뉴"
        aria-hidden={!visible}
      >
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`flex items-center gap-[12px] min-h-[64px] w-full p-[13px] border border-[var(--dl-color-border-default)] rounded-[14px] bg-[var(--dl-color-bg-elevated)] text-left cursor-pointer${action.tone === "danger" ? " border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-danger)] m-dlViewerActionDanger" : ""}`}
            onClick={() => {
              if (action.id === "move") {
                onClose();
                onMoveTopic();
                return;
              }
              onClose();
            }}
          >
            <DailyIcon name={action.icon} size={24} />
            <span className="min-w-0 flex-1 text-left">
              <p className="text-[var(--dl-color-text-danger)] m-0 text-sm font-semibold text-[var(--dl-color-text-primary)]">{action.title}</p>
              <p className="text-[var(--dl-color-text-danger)] m-[4px_0_0] text-[11px] text-[var(--dl-color-text-secondary)]">{action.description}</p>
            </span>
            <span className="text-[var(--dl-color-text-danger)] text-xl text-[var(--dl-color-text-tertiary)]" aria-hidden>
              ›
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
