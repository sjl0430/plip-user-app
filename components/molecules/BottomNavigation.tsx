import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import { BookOpen, Camera, Clapperboard, Settings, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Figma Global Navigation · 402×80
 * 다이어리 / 아지트 / 카메라 / 피드 / 설정
 */
export type BottomNavTab = "diary" | "agit" | "create" | "feed" | "mypage";

type BottomNavigationProps = {
  active?: BottomNavTab;
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
    icon: <BookOpen className="plip-gnav__icon" strokeWidth={2} />,
  },
  {
    id: "agit",
    href: ROUTES.agit.root,
    label: "아지트",
    icon: <UsersRound className="plip-gnav__icon" strokeWidth={2} />,
  },
  {
    id: "create",
    href: ROUTES.create,
    label: "카메라",
    icon: <Camera className="plip-gnav__camera-icon" strokeWidth={2} />,
    create: true,
  },
  {
    id: "feed",
    href: ROUTES.home,
    label: "피드",
    icon: <Clapperboard className="plip-gnav__icon" strokeWidth={2} />,
  },
  {
    id: "mypage",
    href: ROUTES.mypage.root,
    label: "설정",
    icon: <Settings className="plip-gnav__icon" strokeWidth={2} />,
  },
];

export function BottomNavigation({
  active = "diary",
}: BottomNavigationProps) {
  return (
    <nav aria-label="주 메뉴" className="plip-gnav">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;

        if (item.create) {
          return (
            <TextLink
              key={item.id}
              href={item.href}
              aria-label={item.label}
              className="plip-gnav__item plip-gnav__item--camera no-underline"
            >
              <span className="plip-gnav__camera">{item.icon}</span>
              <span className="plip-gnav__label">{item.label}</span>
            </TextLink>
          );
        }

        return (
          <TextLink
            key={item.id}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`plip-gnav__item no-underline${isActive ? " is-active" : ""}`}
          >
            {item.icon}
            <span className="plip-gnav__label">{item.label}</span>
          </TextLink>
        );
      })}
    </nav>
  );
}
