import {
  NavAgitIcon,
  NavCreateIcon,
  NavDiaryIcon,
  NavHomeIcon,
  NavMyPageIcon,
} from "@/components/atoms/NavIcons";
import { PlipLogo, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { ReactNode } from "react";

/**
 * 요구사항정의서 #3 하단 nav:
 * 다이어리(홈) / 아지트 / 카메라 / 피드(소속 아지트 그룹영상) / 설정
 */
export type BottomNavTab = "diary" | "agit" | "create" | "feed" | "mypage";

type BottomNavigationProps = {
  active?: BottomNavTab;
  /** feed = TikTok black bar; light = white profile-style bar */
  variant?: "feed" | "light" | "diary";
};

type NavItem = {
  id: BottomNavTab;
  href: string;
  label: string;
  icon: ReactNode;
  create?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "diary",
    href: ROUTES.diary.root,
    label: "다이어리",
    icon: <NavDiaryIcon className="plip-tt-nav__icon" />,
  },
  {
    id: "agit",
    href: ROUTES.agit.root,
    label: "아지트",
    icon: <NavAgitIcon className="plip-tt-nav__icon" />,
  },
  {
    id: "create",
    href: ROUTES.create,
    label: "카메라",
    icon: <NavCreateIcon className="plip-tt-nav__create-icon" />,
    create: true,
  },
  {
    id: "feed",
    href: ROUTES.home,
    label: "피드",
    icon: <NavHomeIcon className="plip-tt-nav__icon" />,
  },
  {
    id: "mypage",
    href: ROUTES.mypage.root,
    label: "설정",
    icon: <NavMyPageIcon className="plip-tt-nav__icon" />,
  },
];

export function BottomNavigation({
  active = "diary",
  variant = "feed",
}: BottomNavigationProps) {
  const isLight = variant === "light" || variant === "diary";

  return (
    <nav
      aria-label="주 메뉴"
      className={isLight ? "plip-tt-nav plip-tt-nav--light" : "plip-tt-nav"}
    >
      <div className="plip-tt-nav__brand" aria-hidden>
        <PlipLogo width={112} height={64} className="plip-tt-nav__brand-logo" />
      </div>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;

        if (item.create) {
          return (
            <TextLink
              key={item.id}
              href={item.href}
              aria-label={item.label}
              className="plip-tt-nav__create"
            >
              <span className="plip-tt-nav__create-btn">{item.icon}</span>
              <span className="plip-tt-nav__label plip-tt-nav__label--desktop">{item.label}</span>
            </TextLink>
          );
        }

        return (
          <TextLink
            key={item.id}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`plip-tt-nav__item ${isActive ? "is-active" : ""}`.trim()}
          >
            {item.icon}
            <span className="plip-tt-nav__label">{item.label}</span>
          </TextLink>
        );
      })}
    </nav>
  );
}
