type NoticeCardProps = {
  title: string;
  body: string;
};

export function NoticeCard({ title, body }: NoticeCardProps) {
  return (
    <div className="dl-notice-card">
      <p className="dl-notice-card__title">{title}</p>
      <p className="dl-notice-card__body">{body}</p>
    </div>
  );
}
