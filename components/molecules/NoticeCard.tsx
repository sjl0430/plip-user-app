type NoticeCardProps = {
  title: string;
  body: string;
  tone?: "default" | "brand" | "danger";
  className?: string;
};

export function NoticeCard({ title, body, tone = "default", className = "" }: NoticeCardProps) {
  const toneClass =
    tone === "brand" ? "bg-[var(--dl-color-bg-brand-subtle)] m-dlNoticeCardBrand" : tone === "danger" ? "bg-[var(--dl-color-bg-danger)] text-[var(--dl-color-text-danger)] m-dlNoticeCardDanger" : "";

  return (
    <div className={`flex flex-col gap-[4px] p-[14px] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-surface)] ${toneClass} ${className}`.trim()}>
      <p className="text-sm leading-[17px] text-xs leading-[15px] text-[var(--dl-color-text-danger)] m-0 font-semibold leading-[18px] text-[var(--dl-color-text-primary)]">{title}</p>
      <p className="text-[11px] leading-[13px] text-[var(--dl-color-text-danger)] m-0 text-[13px] leading-[16px] text-[var(--dl-color-text-secondary)]">{body}</p>
    </div>
  );
}
