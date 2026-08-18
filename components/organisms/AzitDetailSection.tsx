"use client";

import { AzitMenuDrawer } from "@/components/organisms/AzitMenuDrawer";
import { TopicViewerSection } from "@/components/organisms/TopicViewerSection";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";
import { TextLink } from "@/components/atoms";
import { useState } from "react";

type AzitDetailSectionProps = {
  azitId: string;
};

export function AzitDetailSection({ azitId }: AzitDetailSectionProps) {
  const azit = getAzitById(azitId);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!azit) {
    return (
      <section className="px-6 py-8">
        <p className="dl-subtitle">아지트를 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.azit.root} className="dl-link">
          목록으로
        </TextLink>
      </section>
    );
  }

  return (
    <>
      <TopicViewerSection azitId={azit.id} onMenuClick={() => setMenuOpen(true)} />
      <AzitMenuDrawer azit={azit} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
