import type { ReactNode } from "react";

export type MonthGridCell = {
  day: number;
  outside?: boolean;
  date?: string;
};

export function buildMonthGridCells(
  year: number,
  monthIndex: number,
  fill: "empty" | "adjacent" = "adjacent",
): MonthGridCell[] {
  const startPad = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();
  const cells: MonthGridCell[] = [];
  const month = String(monthIndex + 1).padStart(2, "0");

  for (let index = 0; index < startPad; index += 1) {
    cells.push(
      fill === "empty"
        ? { day: 0, outside: true }
        : { day: prevMonthDays - startPad + 1 + index, outside: true },
    );
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      date: `${year}-${month}-${String(day).padStart(2, "0")}`,
    });
  }

  let overflow = 1;
  while (cells.length % 7 !== 0) {
    cells.push(fill === "empty" ? { day: 0, outside: true } : { day: overflow, outside: true });
    overflow += 1;
  }

  return cells;
}

type MonthCalendarGridProps = {
  weekdayLabels: readonly string[];
  cells: MonthGridCell[];
  renderWeekday?: (label: string, index: number) => ReactNode;
  renderDay: (cell: MonthGridCell, index: number) => ReactNode;
  weekdaysClassName: string;
  daysClassName: string;
};

export function MonthCalendarGrid({
  weekdayLabels,
  cells,
  renderWeekday,
  renderDay,
  weekdaysClassName,
  daysClassName,
}: MonthCalendarGridProps) {
  return (
    <>
      <div className={weekdaysClassName}>
        {weekdayLabels.map((label, index) =>
          renderWeekday ? renderWeekday(label, index) : <span key={label}>{label}</span>,
        )}
      </div>
      <div className={daysClassName}>{cells.map((cell, index) => renderDay(cell, index))}</div>
    </>
  );
}
