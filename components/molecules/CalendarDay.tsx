type CalendarDayProps = {
  day?: number;
  count?: number;
  selected?: boolean;
  onSelect?: (day: number) => void;
};

export function CalendarDay({ day, count = 0, selected = false, onSelect }: CalendarDayProps) {
  if (!day) {
    return <div className="flex min-h-[36px] flex-col items-center justify-center border-0 rounded-[10px] bg-[transparent] p-0 text-[var(--dl-color-text-secondary)]" aria-hidden />;
  }

  const marked = count > 0;

  return (
    <button
      type="button"
      className={`flex min-h-[36px] flex-col items-center justify-center border-0 rounded-[10px] bg-[transparent] p-0 text-[var(--dl-color-text-secondary)] ${marked ? "bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] m-dlCalDayMarked" : ""} ${selected ? "bg-[var(--dl-color-bg-brand)] text-[var(--dl-color-text-inverse)] m-dlCalDaySelected" : ""}`}
      onClick={() => onSelect?.(day)}
    >
      <span className="text-[11px] font-medium leading-[15px]">{day}</span>
      {marked ? <span className="grid w-[16px] h-[12px] place-items-center rounded-[6px] bg-[var(--dl-color-bg-brand)] text-[8px] font-semibold leading-[11px] text-[var(--dl-color-text-inverse)] w-[18px] bg-[var(--dl-color-bg-elevated)] text-[var(--dl-color-text-brand)]">{count}</span> : null}
    </button>
  );
}
