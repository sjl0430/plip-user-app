import { ui } from "@/components/atoms/styles";

export function AuthDivider({ label = "또는" }: { label?: string }) {
  return (
    <div className={ui.divider}>
      <span className={ui.dividerLine} />
      <span className={ui.dividerLabel}>{label}</span>
      <span className={ui.dividerLine} />
    </div>
  );
}
