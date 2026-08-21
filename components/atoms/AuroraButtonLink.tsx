import animStyles from "./AuroraButtonLink.module.css";
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
    <Link className={`${animStyles.plipGlowBtn} ${className}`} {...props}>
      <span aria-hidden className="absolute inset-[-1px] rounded-[inherit] bg-[linear-gradient(180deg,_#1e228a_0%,_#051219_100%)] pointer-events-none" />

      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-1.svg"
          alt=""
          className={`${animStyles.plipGlowBtnGlow} ${animStyles.plipGlowBtnGlow1}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-2.svg"
          alt=""
          className={`${animStyles.plipGlowBtnGlow} ${animStyles.plipGlowBtnGlow2}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plip/glow-blue/glow-3.svg"
          alt=""
          className={`${animStyles.plipGlowBtnGlow} ${animStyles.plipGlowBtnGlow3}`}
        />
        <span className={`${animStyles.plipGlowBtnRim}`} />
        <span className={`${animStyles.plipGlowBtnFlare}`} />
      </span>

      <span aria-hidden className={`${animStyles.plipGlowBtnGrain}`} />
      <span className="relative z-20 font-[var(--font-gothic-a1),_sans-serif] text-[1.25rem] font-semibold tracking-[0.05em] uppercase text-[#ffffff]">{children}</span>
    </Link>
  );
}
