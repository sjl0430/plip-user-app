"use client";

import { IconButton, PageTitle, Separator, TextLink } from "@/components/atoms";
import type { ReactNode } from "react";

type DiaryHeaderProps = {
  onMenuOpen: () => void;
  trailing?: ReactNode;
};

export function DiaryHeader({ onMenuOpen, trailing }: DiaryHeaderProps) {
  return (
    <header className="plip-diary-header">
      <div className="plip-diary-header__bar">
        <PageTitle className="plip-diary-header__title">Personal Clip</PageTitle>
        <IconButton
          label="다이어리 메뉴 열기"
          className="plip-diary-header__menu-btn"
          onClick={onMenuOpen}
        />
        {trailing ? (
          <div className="plip-diary-header__trailing">{trailing}</div>
        ) : null}
      </div>
      <Separator className="plip-diary-header__separator" />
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
    <TextLink href={href} className="block py-1 text-sm no-underline hover:underline">
      {children}
    </TextLink>
  );
}
