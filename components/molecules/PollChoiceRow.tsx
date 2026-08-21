import leftoverStyles from "@/components/styles/leftover.module.css";
import { DailyIcon, Input } from "@/components/atoms";

type PollChoiceRowProps = {
  value: string;
  placeholder?: string;
  variant: "create" | "edit";
  onChange: (value: string) => void;
  onRemove?: () => void;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: () => void;
  onDragEnd?: () => void;
};

export function PollChoiceRow({
  value,
  placeholder = "선택지",
  variant,
  onChange,
  onRemove,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnd,
}: PollChoiceRowProps) {
  return (
    <div
      className={`${leftoverStyles.dlChoice}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={(event) => {
        if (!draggable) return;
        event.preventDefault();
        onDragOver?.();
      }}
      onDragEnd={onDragEnd}
    >
      {variant === "edit" ? (
        <span className={`${leftoverStyles.dlChoiceIcon}`} aria-hidden>
          <DailyIcon name="grip" size={18} />
        </span>
      ) : null}
      <Input
        variant="daily"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-label="선택지"
      />
      {variant === "create" ? (
        <button
          type="button"
          className={`${leftoverStyles.dlChoiceIcon}`}
          aria-label="선택지 삭제"
          disabled={!onRemove}
          onClick={onRemove}
        >
          <DailyIcon name="x" size={18} />
        </button>
      ) : (
        <button type="button" className={`${leftoverStyles.dlChoiceDelete}`} disabled={!onRemove} onClick={onRemove}>
          삭제
        </button>
      )}
    </div>
  );
}
