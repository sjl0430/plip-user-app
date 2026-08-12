import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type AuroraButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
};

export function AuroraButtonLink({
  children,
  className = "",
  ...props
}: AuroraButtonLinkProps) {
  return (
    <Link className={`plip-glow-btn ${className}`} {...props}>
      <span aria-hidden className="plip-glow-btn__base" />

      <span aria-hidden className="plip-glow-btn__mask-group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-1.svg"
          alt=""
          className="plip-glow-btn__glow plip-glow-btn__glow--1"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-2.svg"
          alt=""
          className="plip-glow-btn__glow plip-glow-btn__glow--2"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-3.svg"
          alt=""
          className="plip-glow-btn__glow plip-glow-btn__glow--3"
        />
        <span className="plip-glow-btn__rim" />
        <span className="plip-glow-btn__flare" />
      </span>

      <span aria-hidden className="plip-glow-btn__grain" />
      <span className="plip-glow-btn__label">{children}</span>
    </Link>
  );
}
