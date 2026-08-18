type CalendarDayProps = {
  day?: number;
  count?: number;
  selected?: boolean;
  onSelect?: (day: number) => void;
};

export function CalendarDay({ day, count = 0, selected = false, onSelect }: CalendarDayProps) {
  if (!day) {
    return <div className="dl-cal-day" aria-hidden />;
  }

  const marked = count > 0;

  return (
    <button
      type="button"
      className={`dl-cal-day ${marked ? "dl-cal-day--marked" : ""} ${selected ? "dl-cal-day--selected" : ""}`}
      onClick={() => onSelect?.(day)}
    >
      <span className="dl-cal-day__num">{day}</span>
      {marked ? <span className="dl-cal-day__count">{count}</span> : null}
    </button>
  );
}
