import { DailyIcon, SubmitButton } from "@/components/atoms";

type MemberManageRowProps = {
  name: string;
  meta: string;
  host?: boolean;
  selected?: boolean;
  showMenu?: boolean;
  showActions?: boolean;
  actionsDisabled?: boolean;
  variant?: "hub" | "manage";
  onSelect?: () => void;
  onTransfer?: () => void;
  onBan?: () => void;
};

const rowActionClass = "h-8 w-auto min-w-0 shrink-0 px-2.5 py-0 text-[11px] leading-4";

export function MemberManageRow({
  name,
  meta,
  host = false,
  selected = false,
  showMenu = false,
  showActions = false,
  actionsDisabled = false,
  variant = "manage",
  onSelect,
  onTransfer,
  onBan,
}: MemberManageRowProps) {
  const rowClass = [
    "flex items-center gap-[10px] min-h-[64px] p-[8px_12px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)]",
    variant === "hub" ? "" : "",
    selected ? "border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-danger)] m-dlMemberManageSelected" : "",
    onSelect ? "w-full border border-[var(--dl-color-border-default)] bg-[var(--dl-color-bg-elevated)] cursor-pointer text-left [font:inherit] text-[inherit] m-dlMemberManageInteractive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="grid w-[40px] h-[40px] place-items-center overflow-hidden rounded-[999px] bg-[var(--dl-color-bg-brand-subtle)] shrink-0 [&_img]:block [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
        <img src="/plip/v13/profile-avatar.svg" alt="" width={40} height={40} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[var(--dl-color-text-danger)] m-0 text-sm font-semibold text-[var(--dl-color-text-primary)]">{name}</p>
        <p className="m-[4px_0_0] text-[13px] text-[var(--dl-color-text-secondary)] text-xs leading-[16px]">{meta}</p>
      </div>
      {host ? (
        variant === "hub" ? (
          <span className="text-[11px] font-medium p-[4px_8px] rounded-[999px] bg-[var(--dl-color-bg-brand-subtle)] text-[var(--dl-color-text-brand)] whitespace-nowrap">방장</span>
        ) : (
          <span className="text-[var(--dl-color-text-danger)] ml-auto text-[11px] font-medium text-[var(--dl-color-text-brand)] whitespace-nowrap">방장</span>
        )
      ) : showActions ? (
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <SubmitButton
            type="button"
            variant="outline"
            className={rowActionClass}
            disabled={actionsDisabled}
            aria-label={`${name} 위임`}
            onClick={onTransfer}
          >
            위임
          </SubmitButton>
          <SubmitButton
            type="button"
            variant="danger"
            className={rowActionClass}
            disabled={actionsDisabled}
            aria-label={`${name} 추방`}
            onClick={onBan}
          >
            추방
          </SubmitButton>
        </span>
      ) : variant === "hub" ? (
        <span className={`text-[var(--dl-color-text-danger)] ml-auto text-[11px] font-medium text-[var(--dl-color-text-brand)] whitespace-nowrap${selected ? " text-[var(--dl-color-text-danger)] m-dlMemberManageActionsDanger" : ""}`}>
          위임&nbsp;&nbsp;|&nbsp;&nbsp;추방
        </span>
      ) : null}
      {showMenu ? (
        <button type="button" className="grid w-[44px] h-[44px] place-items-center border-0 rounded-[12px] bg-[var(--dl-color-bg-surface)] text-[var(--dl-color-text-primary)] cursor-pointer shrink-0" aria-label={`${name} 더보기`}>
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
