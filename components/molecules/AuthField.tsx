import { Input, Label } from "@/components/atoms";
import type { ComponentProps } from "react";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  hint?: string;
  type?: ComponentProps<typeof Input>["type"];
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  maxLength?: number;
  pattern?: string;
  title?: string;
};

export function AuthField({
  id,
  name,
  label,
  hint,
  type = "text",
  placeholder,
  autoComplete,
  required,
  defaultValue,
  maxLength,
  pattern,
  title,
}: AuthFieldProps) {
  return (
    <div className="dl-field">
      <Label htmlFor={id} className="dl-field__label">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        variant="daily"
      />
      {hint ? <p className="dl-hint">{hint}</p> : null}
    </div>
  );
}
