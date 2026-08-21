import { DailyIcon } from "@/components/atoms";

type CapacityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  compact?: boolean;
};

export function CapacityStepper({
  value,
  min = 2,
  max = 30,
  onChange,
  compact = false,
}: CapacityStepperProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-[14px] flex items-center justify-between w-[68px] h-[30px] p-[0_12px] rounded-[15px] bg-[var(--dl-color-bg-brand)] text-[#fff] text-xs font-medium m-dlStepperCompact">
        <button
          type="button"
          className="grid place-items-center border border-[var(--dl-color-border-default)] rounded-[22px] bg-[var(--dl-color-bg-surface)] p-[14px] w-auto h-auto border-0 bg-[transparent] text-[inherit] text-sm leading-none p-0"
          aria-label="인원 줄이기"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <button
          type="button"
          className="grid place-items-center border border-[var(--dl-color-border-default)] rounded-[22px] bg-[var(--dl-color-bg-surface)] p-[14px] w-auto h-auto border-0 bg-[transparent] text-[inherit] text-sm leading-none p-0"
          aria-label="인원 늘리기"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[14px]">
      <button
        type="button"
        className="grid place-items-center border border-[var(--dl-color-border-default)] rounded-[22px] bg-[var(--dl-color-bg-surface)] p-[14px] w-auto h-auto border-0 bg-[transparent] text-[inherit] text-sm leading-none p-0"
        aria-label="인원 줄이기"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <DailyIcon name="minus" size={16} />
      </button>
      <p className="m-0 text-xl font-semibold leading-[29px] text-[var(--dl-color-text-primary)]">{value}명</p>
      <button
        type="button"
        className="grid place-items-center border border-[var(--dl-color-border-default)] rounded-[22px] bg-[var(--dl-color-bg-surface)] p-[14px] w-auto h-auto border-0 bg-[transparent] text-[inherit] text-sm leading-none p-0"
        aria-label="인원 늘리기"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <DailyIcon name="plus" size={16} />
      </button>
    </div>
  );
}
