export function AuthDivider({ label = "또는" }: { label?: string }) {
  return (
    <div className="dl-divider">
      <span className="dl-divider__line" />
      <span className="dl-divider__label">{label}</span>
      <span className="dl-divider__line" />
    </div>
  );
}
