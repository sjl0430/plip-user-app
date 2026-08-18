import { DailyIcon, TextLink } from "@/components/atoms";
import { AgitListRow } from "@/components/molecules/AgitListRow";
import { ROUTES } from "@/config/routes";
import type { UiMyAgit } from "@/types/agit/ui";

type AgitListSectionProps = {
  items: UiMyAgit[];
  error?: string;
};

export function AgitListSection({ items, error }: AgitListSectionProps) {
  return (
    <section aria-label="내 아지트" className="flex flex-1 flex-col gap-4 px-6 pb-8 pt-3">
      <header className="dl-page-head">
        <h1 className="dl-page-head__title">아지트</h1>
        <TextLink href={ROUTES.agit.search} className="dl-icon-sq no-underline" aria-label="검색">
          <DailyIcon name="search" size={20} />
        </TextLink>
      </header>

      <label className="dl-field">
        <span className="dl-field__label">내 아지트 검색</span>
        <input
          className="dl-input"
          placeholder="제목 또는 프로필로 검색"
          disabled
        />
      </label>

      {error ? (
        <p className="m-0 text-[14px] text-[var(--dl-color-text-secondary)]" role="alert">
          {error}
        </p>
      ) : null}

      <p className="m-0 text-[16px] font-semibold text-[var(--dl-color-text-primary)]">
        참여 중인 아지트  {items.length}
      </p>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <AgitListRow key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    </section>
  );
}
