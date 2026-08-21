import { Checkbox } from "@/components/atoms";

type AgreementRowProps = {
  id: string;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function AgreementRow({
  id,
  name,
  label,
  description,
  required,
  defaultChecked,
  checked,
  onChange,
}: AgreementRowProps) {
  return (
    <label htmlFor={id} className="flex w-full items-center gap-2.5">
      <Checkbox
        id={id}
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        className="peer sr-only size-px overflow-hidden"
      />
      <span
        aria-hidden
        className="grid size-6 shrink-0 place-items-center overflow-hidden rounded-[var(--dl-radius-sm)] border border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-surface)] peer-checked:border-[var(--dl-color-border-brand)] peer-checked:bg-[var(--dl-color-bg-brand)] peer-checked:[&_img]:opacity-100"
      >
        <img
          src="/plip/daily-loop/icon-check.svg"
          alt=""
          width={16}
          height={16}
          className="size-4 opacity-0"
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium leading-5 text-[var(--dl-color-text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="text-xs leading-[17px] text-[var(--dl-color-text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
