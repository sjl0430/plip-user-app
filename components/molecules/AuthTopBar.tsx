import { TextLink } from "@/components/atoms";
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
    <div className="dl-topbar">
      {onBack ? (
        <button type="button" className="dl-topbar__back" aria-label="뒤로" onClick={onBack}>
          <BackGlyph />
        </button>
      ) : (
        <TextLink href={backHref ?? "/"} className="dl-topbar__back no-underline" aria-label="뒤로">
          <BackGlyph />
        </TextLink>
      )}
      {title ? <h1 className="dl-topbar__title">{title}</h1> : <span className="flex-1" />}
      {trailing ? <div className="dl-topbar__trailing">{trailing}</div> : null}
      {!trailing && step ? <span className="dl-topbar__step">{step}</span> : null}
    </div>
  );
}
