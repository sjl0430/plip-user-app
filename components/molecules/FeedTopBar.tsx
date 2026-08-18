import { PlipLogo, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { UiFeedTab } from "@/types/feed/ui";

type FeedTopBarProps = {
  activeTab?: UiFeedTab;
};

export function FeedTopBar({ activeTab = "myAgits" }: FeedTopBarProps) {
  return (
    <header className="plip-tt-feed__top">
      <PlipLogo width={86} height={50} className="plip-tt-feed__logo" />
      <div className="plip-tt-feed__tabs" role="tablist" aria-label="피드 탭">
        <span
          role="tab"
          aria-selected={activeTab === "myAgits"}
          className={`plip-tt-feed__tab${activeTab === "myAgits" ? " is-active" : ""}`}
        >
          내 아지트
        </span>
        <span
          role="tab"
          aria-selected={activeTab === "groupClips"}
          className={`plip-tt-feed__tab${activeTab === "groupClips" ? " is-active" : ""}`}
        >
          그룹영상
        </span>
      </div>
      <TextLink href={ROUTES.agit.search} className="plip-tt-feed__search">
        검색
      </TextLink>
    </header>
  );
}
