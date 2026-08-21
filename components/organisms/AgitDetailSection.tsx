"use client";

import { AgitMenuDrawer } from "@/components/organisms/AgitMenuDrawer";
import { TopicViewerSection } from "@/components/organisms/TopicViewerSection";
import { ROUTES } from "@/config/routes";
import type { UiAgit } from "@/types/agit/ui";
import { TextLink } from "@/components/atoms";
import { useState } from "react";

type AgitDetailSectionProps = {
  agit: UiAgit | null;
  error?: string;
};

export function AgitDetailSection({ agit, error }: AgitDetailSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (error) {
    return (
      <section className="px-6 py-8">
        <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">{error}</p>
        <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
          목록으로
        </TextLink>
      </section>
    );
  }

  if (!agit) {
    return (
      <section className="px-6 py-8">
        <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">아지트를 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
          목록으로
        </TextLink>
      </section>
    );
  }

  return (
    <>
      <TopicViewerSection agitId={agit.id} onMenuClick={() => setMenuOpen(true)} />
      <AgitMenuDrawer agit={agit} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
