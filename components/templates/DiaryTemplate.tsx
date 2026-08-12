"use client";

import { BottomNavigation } from "@/components/molecules";
import { DiaryHeader } from "@/components/organisms/DiaryHeader";
import { DiarySideMenu } from "@/components/organisms/DiarySideMenu";
import type { ReactNode } from "react";
import { useState } from "react";

type DiaryTemplateProps = {
  children: ReactNode;
  headerTrailing?: ReactNode;
};

export function DiaryTemplate({ children, headerTrailing }: DiaryTemplateProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="plip-diary-shell">
      <DiaryHeader
        onMenuOpen={() => setMenuOpen(true)}
        trailing={headerTrailing}
      />

      <main className="plip-diary-main">{children}</main>

      <BottomNavigation active="diary" variant="diary" />
      <DiarySideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
