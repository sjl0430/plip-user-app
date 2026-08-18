import { DailyIcon, SubmitButton } from "@/components/atoms";
import { ActionSheet } from "@/components/molecules/ActionSheet";
import { NoticeCard } from "@/components/molecules/NoticeCard";

const TOPICS = [
  { id: "diet", label: "#아침_식단", meta: "영상 없음 · 이동 가능", available: true },
  { id: "read", label: "#독서_10분", meta: "이미 내 영상이 있음", available: false },
  { id: "goal", label: "#오늘의_목표", meta: "영상 없음 · 이동 가능", available: true },
] as const;

type MoveTopicSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MoveTopicSheet({ open, onClose }: MoveTopicSheetProps) {
  return (
    <ActionSheet open={open} title="토픽 이동" description="현재 영상의 목적을 변경합니다" onClose={onClose}>
      <NoticeCard title="새벽 러닝 완료" body="8월 14일 · 00:05 · 현재  #7시_러닝_인증" />
      <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">이동할 토픽</p>
      {TOPICS.map((topic) => (
        <div key={topic.id} className="dl-member-manage">
          <div className="min-w-0 flex-1">
            <p className="dl-member-manage__name">{topic.label}</p>
            <p className="dl-member-manage__meta">{topic.meta}</p>
          </div>
          {topic.available ? <DailyIcon name="check" size={18} /> : null}
        </div>
      ))}
      <SubmitButton variant="brand" onClick={onClose}>
        이 토픽으로 이동
      </SubmitButton>
    </ActionSheet>
  );
}
