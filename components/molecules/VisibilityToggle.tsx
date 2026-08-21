type Visibility = "public" | "private";

type VisibilityToggleProps = {
  value: Visibility;
  onChange: (value: Visibility) => void;
};

export function VisibilityToggle({ value, onChange }: VisibilityToggleProps) {
  return (
    <div className="flex w-full items-center rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[4px]" role="tablist" aria-label="방 공개 여부">
      <button
        type="button"
        role="tab"
        aria-selected={value === "public"}
        className={`flex-1 border-0 rounded-[12px] bg-[transparent] p-[12px] text-sm font-medium leading-5 text-[var(--dl-color-text-secondary)] ${value === "public" ? "bg-[var(--dl-color-bg-surface)] font-semibold text-[var(--dl-color-text-brand)] m-dlSegmentItemActive" : ""}`}
        onClick={() => onChange("public")}
      >
        공개 방
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "private"}
        className={`flex-1 border-0 rounded-[12px] bg-[transparent] p-[12px] text-sm font-medium leading-5 text-[var(--dl-color-text-secondary)] ${value === "private" ? "bg-[var(--dl-color-bg-surface)] font-semibold text-[var(--dl-color-text-brand)] m-dlSegmentItemActive" : ""}`}
        onClick={() => onChange("private")}
      >
        비공개 방
      </button>
    </div>
  );
}
