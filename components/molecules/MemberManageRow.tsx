import { DailyIcon, SubmitButton } from "@/components/atoms";
import { ManageListRow } from "@/components/molecules/ManageListRow";

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
  const trailing = (
    <>
      {host ? (
        variant === "hub" ? (
          <span className="whitespace-nowrap rounded-[999px] bg-[var(--dl-color-bg-brand-subtle)] p-[4px_8px] text-[11px] font-medium text-[var(--dl-color-text-brand)]">
            방장
          </span>
        ) : (
          <span className="whitespace-nowrap text-[11px] font-medium text-[var(--dl-color-text-brand)]">방장</span>
        )
      ) : showActions ? (
        <span className="flex shrink-0 items-center gap-1">
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
        <span
          className={`whitespace-nowrap text-[11px] font-medium text-[var(--dl-color-text-brand)]${selected ? " text-[var(--dl-color-text-danger)] m-dlMemberManageActionsDanger" : ""}`}
        >
          위임&nbsp;&nbsp;|&nbsp;&nbsp;추방
        </span>
      ) : null}
      {showMenu ? (
        <button
          type="button"
          className="grid h-[44px] w-[44px] shrink-0 cursor-pointer place-items-center rounded-[12px] border-0 bg-[var(--dl-color-bg-surface)] text-[var(--dl-color-text-primary)]"
          aria-label={`${name} 더보기`}
        >
          <DailyIcon name="ellipsis" size={20} />
        </button>
      ) : null}
    </>
  );

  const row = (
    <ManageListRow
      className={selected ? "bg-[var(--dl-color-bg-danger)] m-dlMemberManageSelected" : undefined}
      leading={
        <span className="grid h-[40px] w-[40px] shrink-0 place-items-center overflow-hidden rounded-[999px] bg-[var(--dl-color-bg-brand-subtle)] [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <img src="/plip/v13/profile-avatar.svg" alt="" width={40} height={40} />
        </span>
      }
      title={name}
      meta={meta}
      trailing={trailing}
    />
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className="w-full cursor-pointer border-0 bg-transparent p-0 text-left [font:inherit] text-[inherit] m-dlMemberManageInteractive"
        onClick={onSelect}
      >
        {row}
      </button>
    );
  }

  return row;
}
