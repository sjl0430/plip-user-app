type NoticeCardProps = {
  title: string;
  body: string;
  tone?: "default" | "brand" | "danger";
  className?: string;
};

export function NoticeCard({ title, body, tone = "default", className = "" }: NoticeCardProps) {
  const toneClass =
    tone === "brand" ? "dl-notice-card--brand" : tone === "danger" ? "dl-notice-card--danger" : "";

  return (
    <div className={`dl-notice-card ${toneClass} ${className}`.trim()}>
      <p className="dl-notice-card__title">{title}</p>
      <p className="dl-notice-card__body">{body}</p>
    </div>
  );
}
