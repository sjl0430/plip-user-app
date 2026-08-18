type TopicChipProps = {
  children: string;
  selected?: boolean;
  onClick?: () => void;
};

export function TopicChip({ children, selected = false, onClick }: TopicChipProps) {
  return (
    <button
      type="button"
      className={`dl-topic-chip ${selected ? "dl-topic-chip--active" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
