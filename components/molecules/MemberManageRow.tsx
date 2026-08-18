type MemberManageRowProps = {
  name: string;
  meta: string;
  host?: boolean;
};

export function MemberManageRow({ name, meta, host = false }: MemberManageRowProps) {
  return (
    <div className="dl-member-manage">
      <span className="dl-member-manage__avatar">{name.slice(0, 1)}</span>
      <div className="min-w-0 flex-1">
        <p className="dl-member-manage__name">{name}</p>
        <p className="dl-member-manage__meta">{meta}</p>
      </div>
      {host ? (
        <span className="dl-member-manage__actions">방장</span>
      ) : (
        <span className="dl-member-manage__actions">위임  |  추방</span>
      )}
    </div>
  );
}
