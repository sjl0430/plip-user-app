import { DailyIcon, TextLink, type DailyIconName } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export type RoomNavTab = "video" | "chat" | "calendar" | "members";

type RoomNavProps = {
  agitId: string;
  active?: RoomNavTab;
};

const TABS: {
  id: RoomNavTab;
  label: string;
  icon: DailyIconName;
  activeIcon?: DailyIconName;
  href: (agitId: string) => string;
}[] = [
  { id: "video", label: "영상", icon: "video", href: ROUTES.agit.detail },
  { id: "chat", label: "채팅", icon: "message", activeIcon: "messageBrand", href: ROUTES.agit.chat },
  {
    id: "calendar",
    label: "캘린더",
    icon: "calendar",
    activeIcon: "calendarBrand",
    href: ROUTES.agit.calendar,
  },
  {
    id: "members",
    label: "멤버",
    icon: "users",
    activeIcon: "usersBrand",
    href: ROUTES.agit.manage,
  },
];

export function RoomNav({ agitId, active = "members" }: RoomNavProps) {
  return (
    <nav className="dl-room-nav" aria-label="방 메뉴">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <TextLink
            key={tab.id}
            href={tab.href(agitId)}
            className={`dl-room-nav__item no-underline ${isActive ? "dl-room-nav__item--active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <DailyIcon name={isActive && tab.activeIcon ? tab.activeIcon : tab.icon} size={20} />
            <p className="dl-room-nav__label">{tab.label}</p>
          </TextLink>
        );
      })}
    </nav>
  );
}
