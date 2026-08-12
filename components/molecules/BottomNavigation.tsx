import { NavDiaryIcon, NavHomeIcon, NavMyPageIcon } from "@/components/atoms/NavIcons";
import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { ReactNode } from "react";

type BottomNavigationProps = {
  active?: "home" | "diary" | "mypage";
  variant?: "default" | "diary";
};

type NavItem = {
  id: "home" | "diary" | "mypage";
  href: string;
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    href: ROUTES.diary.root,
    label: "홈",
    icon: <NavHomeIcon className="plip-bottom-nav__icon" />,
  },
  {
    id: "diary",
    href: ROUTES.diary.root,
    label: "다이어리",
    icon: <NavDiaryIcon className="plip-bottom-nav__icon" />,
  },
  {
    id: "mypage",
    href: ROUTES.mypage.root,
    label: "마이페이지",
    icon: <NavMyPageIcon className="plip-bottom-nav__icon" />,
  },
];

export function BottomNavigation({
  active = "mypage",
  variant = "default",
}: BottomNavigationProps) {
  const usePlipStyle = variant === "diary";

  return (
    <nav
      aria-label="하단 메뉴"
      className={usePlipStyle ? "plip-bottom-nav" : "plip-bottom-nav plip-bottom-nav--light"}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;

        return (
          <TextLink
            key={item.id}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`plip-bottom-nav__item ${isActive ? "is-active" : ""}`.trim()}
          >
            {item.icon}
          </TextLink>
        );
      })}
    </nav>
  );
}
