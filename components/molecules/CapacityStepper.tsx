import { DailyIcon } from "@/components/atoms";

type CapacityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function CapacityStepper({ value, min = 2, max = 30, onChange }: CapacityStepperProps) {
  return (
    <div className="dl-stepper">
      <button
        type="button"
        className="dl-stepper__btn"
        aria-label="인원 줄이기"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <DailyIcon name="minus" size={16} />
      </button>
      <p className="dl-stepper__value">{value}명</p>
      <button
        type="button"
        className="dl-stepper__btn"
        aria-label="인원 늘리기"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <DailyIcon name="plus" size={16} />
      </button>
    </div>
  );
}
