import leftoverStyles from "@/components/styles/leftover.module.css";
import { PlipLogo, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiFeedTab } from "@/types/feed/ui";

type FeedTopBarProps = {
  activeTab?: UiFeedTab;
};

export function FeedTopBar({ activeTab = "myAgits" }: FeedTopBarProps) {
  return (
    <header className={`${leftoverStyles.plipTtFeedTop} pointer-events-none absolute inset-x-0 top-0 z-[4] grid grid-cols-[auto_1fr_auto] items-center gap-2 px-[0.85rem] pt-[0.7rem]`}>
      <PlipLogo width={86} height={50} className="w-[5.4rem] h-auto [filter:drop-shadow(0_2px_8px_rgba(0,_0,_0,_0.45))]" />
      <div className="flex justify-center gap-[1.25rem] [justify-self:center]" role="tablist" aria-label="피드 탭">
        <span
          role="tab"
          aria-selected={activeTab === "myAgits"}
          className={`rounded-[var(--dc-btn-radius)] px-[0.7rem] py-[0.28rem] text-[0.875rem] font-semibold ${activeTab === "myAgits" ? leftoverStyles.isActive + " border border-[var(--dc-glass-dark-border)] bg-[linear-gradient(180deg,var(--dc-glass-dark-from),var(--dc-glass-dark-to))] text-white backdrop-blur-[16px]" : "text-white/62"}`}
        >
          내 아지트
        </span>
        <span
          role="tab"
          aria-selected={activeTab === "groupClips"}
          className={`rounded-[var(--dc-btn-radius)] px-[0.7rem] py-[0.28rem] text-[0.875rem] font-semibold ${activeTab === "groupClips" ? leftoverStyles.isActive + " border border-[var(--dc-glass-dark-border)] bg-[linear-gradient(180deg,var(--dc-glass-dark-from),var(--dc-glass-dark-to))] text-white backdrop-blur-[16px]" : "text-white/62"}`}
        >
          그룹영상
        </span>
      </div>
      <TextLink href={ROUTES.agit.search} className="absolute right-[0.85rem] top-[0.95rem] z-[3] !text-[#fff] !no-underline text-[0.78rem] font-semibold p-[0.28rem_0.7rem] rounded-[var(--dc-btn-radius)] border border-[var(--dc-glass-dark-border)] bg-[linear-gradient(180deg,_var(--dc-glass-dark-from),_var(--dc-glass-dark-to))] backdrop-blur-[16px]">
        검색
      </TextLink>
    </header>
  );
}
