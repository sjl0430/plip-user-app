import { Label, Switch } from "@/components/atoms";

type SwitchFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export function SwitchField({
  id,
  name,
  label,
  defaultChecked,
}: SwitchFieldProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} name={name} defaultChecked={defaultChecked} />
    </div>
  );
}
