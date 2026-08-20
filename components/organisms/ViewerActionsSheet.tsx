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
        className={`dl-viewer-scrim ${visible ? "dl-viewer-scrim--open" : ""}`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`dl-viewer-actions ${visible ? "dl-viewer-actions--open" : ""}`}
        role="dialog"
        aria-modal
        aria-label="더보기 메뉴"
        aria-hidden={!visible}
      >
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`dl-viewer-action${action.tone === "danger" ? " dl-viewer-action--danger" : ""}`}
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
              <p className="dl-viewer-action__title">{action.title}</p>
              <p className="dl-viewer-action__desc">{action.description}</p>
            </span>
            <span className="dl-viewer-action__chevron" aria-hidden>
              ›
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
