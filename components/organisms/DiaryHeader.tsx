"use client";

import { DailyIcon, IconButton, TextLink } from "@/components/atoms";
import { ScreenHeader } from "@/components/molecules";
import type { ReactNode } from "react";

type DiaryHeaderProps = {
  onMenuOpen: () => void;
  trailing?: ReactNode;
  title?: string;
};

/** Figma Hybrid Diary header */
export function DiaryHeader({
  onMenuOpen,
  trailing,
  title = "다이어리",
}: DiaryHeaderProps) {
  return (
    <ScreenHeader
      className="sticky top-0 z-20 border-b border-white/70 bg-white/50 px-4 py-3.5 backdrop-blur-xl"
      title={<h1 className="m-0 text-[22px] font-bold tracking-tight text-[#161823]">{title}</h1>}
      trailing={
        <div className="flex items-center gap-2">
          {trailing}
          <IconButton variant="surface" label="다이어리 메뉴" onClick={onMenuOpen}>
            <DailyIcon name="ellipsis" size={20} />
          </IconButton>
        </div>
      }
    />
  );
}

export function DiaryMenuLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <TextLink href={href} className="!block p-[0.45rem_0] !text-[#111] !text-[0.92rem] !font-bold !no-underline">
      {children}
    </TextLink>
  );
}
