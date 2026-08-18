type TopicOptionProps = {
  label: string;
  available: boolean;
  selected: boolean;
  onSelect: () => void;
};

export function TopicOption({ label, available, selected, onSelect }: TopicOptionProps) {
  return (
    <button
      type="button"
      disabled={!available}
      className={`dl-topic ${selected ? "dl-topic--active" : ""} ${available ? "" : "dl-topic--disabled"}`}
      onClick={onSelect}
    >
      <span className="dl-topic__left">
        <span className="relative block size-[18px] overflow-clip">
          <img
            src={selected ? "/plip/daily-loop/radio-on.svg" : "/plip/daily-loop/radio-off.svg"}
            alt=""
            width={18}
            height={18}
            className="size-full"
          />
        </span>
        <span className="text-[14px] font-medium leading-5 text-[var(--dl-color-text-primary)]">
          {label}
        </span>
      </span>
      <span className={`dl-topic__status ${available ? "" : "dl-topic__status--muted"}`}>
        {available ? "등록 가능" : "이미 등록함"}
      </span>
    </button>
  );
}
