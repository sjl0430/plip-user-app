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
      className={`flex w-full items-center justify-between border border-[var(--dl-color-border-default)] rounded-[13px] bg-[var(--dl-color-bg-elevated)] p-[14px] text-left ${selected ? "border border-[var(--dl-color-border-brand)] bg-[var(--dl-color-bg-brand-subtle)] m-dlTopicActive" : ""} ${available ? "" : "opacity-[0.7] m-dlTopicDisabled"}`}
      onClick={onSelect}
    >
      <span className="flex items-center gap-[9px]">
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
      <span className={`text-[11px] font-medium leading-[16px] text-[var(--dl-color-text-success)] ${available ? "" : "text-[var(--dl-color-text-tertiary)] m-dlTopicStatusMuted"}`}>
        {available ? "등록 가능" : "이미 등록함"}
      </span>
    </button>
  );
}
