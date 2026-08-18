type DailyToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function DailyToggle({ checked, onChange, label }: DailyToggleProps) {
  return (
    <label className="dl-toggle">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-label={label}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="dl-toggle__track">
        <img
          src={checked ? "/plip/daily-loop/toggle-on.svg" : "/plip/daily-loop/toggle-off.svg"}
          alt=""
          width={52}
          height={32}
        />
      </span>
    </label>
  );
}
