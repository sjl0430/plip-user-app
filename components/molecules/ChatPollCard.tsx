import { DailyIcon, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export type ChatPollOption = {
  id: string;
  label: string;
  votes: number;
};

type ChatPollCardProps = {
  agitId: string;
  question: string;
  meta: string;
  options: ChatPollOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ChatPollCard({
  agitId,
  question,
  meta,
  options,
  selectedId,
  onSelect,
}: ChatPollCardProps) {
  return (
    <article className="flex w-full flex-col gap-[12px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-surface)] p-[16px]">
      <div>
        <p className="m-0 text-base font-semibold text-[var(--dl-color-text-primary)]">{question}</p>
        <p className="m-[4px_0_0] text-xs text-[var(--dl-color-text-secondary)]">{meta}</p>
      </div>
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            className={`flex w-full items-center justify-between gap-[10px] min-h-[44px] border-0 rounded-[var(--dl-radius-md)] bg-[var(--dl-color-bg-canvas)] p-[0_12px] text-left ${selected ? "border border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] m-dlPollOptionSelected" : ""}`}
            onClick={() => onSelect(option.id)}
          >
            <DailyIcon name={selected ? "circleDotBrand" : "circle"} size={16} />
            <span className="flex-1 text-sm font-semibold">{option.label}</span>
            <span className="text-sm font-semibold text-[var(--dl-color-text-secondary)] text-[var(--dl-color-text-brand)]">{option.votes}표</span>
          </button>
        );
      })}
      <TextLink href={ROUTES.agit.pollEdit(agitId)} className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-brand-subtle)] !text-[var(--dl-color-text-brand)] shadow-[none] [backdrop-filter:none] m-dlBtnSecondary no-underline">
        투표 수정
      </TextLink>
    </article>
  );
}
