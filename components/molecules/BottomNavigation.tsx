import {
  NavAgitIcon,
  NavCaptureIcon,
  NavDiaryIcon,
  NavHeartIcon,
  NavMyPageIcon,
} from "@/components/atoms/NavIcons";
import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import type { ReactNode } from "react";

export type BottomNavId = "diary" | "heart" | "capture" | "agit" | "mypage";

type BottomNavigationProps = {
  active?: BottomNavId;
  variant?: "default" | "diary";
};

type NavItem = {
  id: BottomNavId;
  label: string;
  icon: ReactNode;
  href?: string;
  disabled?: boolean;
  capture?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "diary",
    href: ROUTES.diary.root,
    label: "다이어리",
    icon: <NavDiaryIcon className="plip-bottom-nav__icon" />,
  },
  {
    id: "heart",
    label: "하트",
    icon: <NavHeartIcon className="plip-bottom-nav__icon" />,
    disabled: true,
  },
  {
    id: "capture",
    label: "촬영",
    icon: <NavCaptureIcon className="plip-bottom-nav__icon" />,
    disabled: true,
    capture: true,
  },
  {
    id: "agit",
    href: ROUTES.agit.root,
    label: "아지트",
    icon: <NavAgitIcon className="plip-bottom-nav__icon" />,
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
        const itemClass = [
          "plip-bottom-nav__item",
          item.capture ? "plip-bottom-nav__item--capture" : "",
          isActive ? "is-active" : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (item.disabled || !item.href) {
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-disabled="true"
              className={itemClass}
            >
              {item.icon}
            </button>
          );
        }

        return (
          <TextLink
            key={item.id}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={itemClass}
          >
            {item.icon}
          </TextLink>
        );
      })}
    </nav>
  );
}
