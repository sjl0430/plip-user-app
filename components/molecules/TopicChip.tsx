type TopicChipProps = {
  children: string;
  selected?: boolean;
  onClick?: () => void;
};

export function TopicChip({ children, selected = false, onClick }: TopicChipProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center min-h-[29px] border-0 rounded-[16px] p-[7px_12px] bg-[var(--dl-color-bg-surface)] text-xs font-medium leading-[15px] text-[var(--dl-color-text-secondary)] ${selected ? "bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] m-dlTopicChipActive" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
