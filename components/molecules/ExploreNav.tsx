import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export type ExploreNavTab = "home" | "explore" | "rooms" | "profile";

type ExploreNavProps = {
  active?: ExploreNavTab;
};

const TABS: { id: ExploreNavTab; label: string; href: string }[] = [
  { id: "home", label: "홈", href: ROUTES.home },
  { id: "explore", label: "탐색", href: ROUTES.azit.root },
  { id: "rooms", label: "내 방", href: ROUTES.azit.detail("azit-walk") },
  { id: "profile", label: "프로필", href: ROUTES.mypage.root },
];

export function ExploreNav({ active = "explore" }: ExploreNavProps) {
  return (
    <nav className="dl-explore-nav" aria-label="앱 메뉴">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <TextLink
            key={tab.id}
            href={tab.href}
            className={`dl-explore-nav__item no-underline ${isActive ? "dl-explore-nav__item--active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="dl-explore-nav__dot">
              <img
                src={isActive ? "/plip/daily-loop/nav-dot-active.svg" : "/plip/daily-loop/nav-dot.svg"}
                alt=""
                width={18}
                height={18}
              />
            </span>
            <p className="dl-explore-nav__label">{tab.label}</p>
          </TextLink>
        );
      })}
    </nav>
  );
}
