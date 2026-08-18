import { DailyIcon } from "@/components/atoms";
import { ActionSheet } from "@/components/molecules/ActionSheet";

type ViewerActionsSheetProps = {
  open: boolean;
  onClose: () => void;
  onMoveTopic: () => void;
};

export function ViewerActionsSheet({ open, onClose, onMoveTopic }: ViewerActionsSheetProps) {
  return (
    <ActionSheet open={open} title="내 영상" description="더보기 메뉴" onClose={onClose}>
      <button type="button" className="dl-action-item">
        <DailyIcon name="download" size={24} />
        <span>
          <p className="dl-action-item__title">영상 다운로드</p>
          <p className="dl-action-item__desc">원본 파일을 기기에 저장합니다</p>
        </span>
      </button>
      <button
        type="button"
        className="dl-action-item"
        onClick={() => {
          onClose();
          onMoveTopic();
        }}
      >
        <DailyIcon name="upload" size={24} />
        <span>
          <p className="dl-action-item__title">토픽 이동</p>
          <p className="dl-action-item__desc">다른 토픽으로 영상을 옮깁니다</p>
        </span>
      </button>
      <button type="button" className="dl-action-item dl-action-item--danger">
        <DailyIcon name="trash" size={24} />
        <span>
          <p className="dl-action-item__title">영상 삭제</p>
          <p className="dl-action-item__desc">삭제 후에는 복구할 수 없습니다</p>
        </span>
      </button>
    </ActionSheet>
  );
}
