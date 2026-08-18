import { DailyIcon } from "@/components/atoms";

type MemberManageRowProps = {
  name: string;
  meta: string;
  host?: boolean;
  selected?: boolean;
  showMenu?: boolean;
  variant?: "hub" | "manage";
  onSelect?: () => void;
};

export function MemberManageRow({
  name,
  meta,
  host = false,
  selected = false,
  showMenu = false,
  variant = "manage",
  onSelect,
}: MemberManageRowProps) {
  const rowClass = [
    "dl-member-manage",
    variant === "hub" ? "dl-member-manage--hub" : "",
    selected ? "dl-member-manage--selected" : "",
    onSelect ? "dl-member-manage--interactive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="dl-member-manage__avatar">
        <img src="/plip/v13/profile-avatar.svg" alt="" width={40} height={40} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="dl-member-manage__name">{name}</p>
        <p className="dl-member-manage__meta">{meta}</p>
      </div>
      {host ? (
        variant === "hub" ? (
          <span className="dl-member-manage__badge">방장</span>
        ) : (
          <span className="dl-member-manage__actions">방장</span>
        )
      ) : (
        <span className={`dl-member-manage__actions${selected ? " dl-member-manage__actions--danger" : ""}`}>
          위임&nbsp;&nbsp;|&nbsp;&nbsp;추방
        </span>
      )}
      {showMenu ? (
        <button type="button" className="dl-member-manage__menu" aria-label={`${name} 더보기`}>
          <DailyIcon name="ellipsis" size={20} />
        </button>
      ) : null}
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className={rowClass} onClick={onSelect}>
        {content}
      </button>
    );
  }

  return <div className={rowClass}>{content}</div>;
}
