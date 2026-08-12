import { Checkbox, Label } from "@/components/atoms";
import type { ComponentProps } from "react";

type CheckboxFieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultChecked?: boolean;
  value?: ComponentProps<typeof Checkbox>["value"];
};

export function CheckboxField({
  id,
  name,
  label,
  required,
  defaultChecked,
  value,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        value={value}
      />
      <Label htmlFor={id} className="font-normal">
        {label}
      </Label>
    </div>
  );
}
