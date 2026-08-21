"use client";

import { TextLink } from "@/components/atoms";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/70 bg-white/50 px-4 py-3.5 backdrop-blur-xl">
      <h1 className="text-[22px] font-bold tracking-tight text-[#161823]">{title}</h1>
      <div className="flex items-center gap-2">
        {trailing}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto px-2 text-[13px] font-semibold text-muted-foreground"
          onClick={onMenuOpen}
        >
          메뉴
        </Button>
      </div>
    </header>
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
