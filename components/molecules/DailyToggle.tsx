type DailyToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function DailyToggle({ checked, onChange, label }: DailyToggleProps) {
  return (
    <label className="relative inline-flex w-[52px] h-[44px] shrink-0 items-center justify-center [&_input]:absolute [&_input]:w-[1px] [&_input]:h-[1px] [&_input]:overflow-hidden [&_input]:[clip:rect(0,_0,_0,_0)]">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-label={label}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="relative block w-[52px] h-[32px] overflow-hidden [&_img]:w-full [&_img]:h-full">
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
