import { TextLink } from "@/components/atoms";
import { ui } from "@/components/atoms/styles";
import type { ReactNode } from "react";

type AuthTopBarProps = {
  title: string;
  backHref?: string;
  onBack?: () => void;
  step?: string;
  trailing?: ReactNode;
};

function BackGlyph() {
  return (
    <span className="relative block size-6 overflow-clip">
      <img
        src="/plip/daily-loop/icon-chevron-left.svg"
        alt=""
        width={24}
        height={24}
        className="size-full"
      />
    </span>
  );
}

export function AuthTopBar({ title, backHref, onBack, step, trailing }: AuthTopBarProps) {
  return (
    <div className={ui.topbar}>
      {onBack ? (
        <button type="button" className={ui.topbarBack} aria-label="뒤로" onClick={onBack}>
          <BackGlyph />
        </button>
      ) : (
        <TextLink href={backHref ?? "/"} className={ui.topbarBack} aria-label="뒤로">
          <BackGlyph />
        </TextLink>
      )}
      {title ? <h1 className={ui.topbarTitle}>{title}</h1> : <span className="flex-1" />}
      {trailing ? <div className={ui.topbarTrailing}>{trailing}</div> : null}
      {!trailing && step ? <span className={ui.topbarStep}>{step}</span> : null}
    </div>
  );
}
