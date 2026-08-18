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
    <label htmlFor={id} className="dl-agree">
      <Checkbox
        id={id}
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className="dl-agree__box" aria-hidden>
        <img src="/plip/daily-loop/icon-check.svg" alt="" width={16} height={16} />
      </span>
      <span className="dl-agree__text">
        <span className="dl-agree__label">{label}</span>
        {description ? <span className="dl-agree__desc">{description}</span> : null}
      </span>
    </label>
  );
}
