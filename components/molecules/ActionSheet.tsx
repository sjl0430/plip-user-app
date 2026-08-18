import type { ReactNode } from "react";

type ActionSheetProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

export function ActionSheet({ open, title, description, onClose, children }: ActionSheetProps) {
  if (!open) return null;

  return (
    <>
      <button type="button" className="dl-sheet-scrim" aria-label="닫기" onClick={onClose} />
      <div className="dl-sheet" role="dialog" aria-modal>
        {title ? <h2 className="dl-title text-[24px] leading-[29px]">{title}</h2> : null}
        {description ? <p className="dl-subtitle">{description}</p> : null}
        {children}
      </div>
    </>
  );
}
