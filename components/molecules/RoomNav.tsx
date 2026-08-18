import { DailyIcon, TextLink, type DailyIconName } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export type RoomNavTab = "video" | "chat" | "calendar" | "members";

type RoomNavProps = {
  azitId: string;
  active?: RoomNavTab;
};

const TABS: {
  id: RoomNavTab;
  label: string;
  icon: DailyIconName;
  activeIcon?: DailyIconName;
  href: (azitId: string) => string;
}[] = [
  { id: "video", label: "영상", icon: "video", href: ROUTES.azit.detail },
  { id: "chat", label: "채팅", icon: "message", activeIcon: "messageBrand", href: ROUTES.azit.chat },
  {
    id: "calendar",
    label: "캘린더",
    icon: "calendar",
    activeIcon: "calendarBrand",
    href: ROUTES.azit.calendar,
  },
  {
    id: "members",
    label: "멤버",
    icon: "users",
    activeIcon: "usersBrand",
    href: ROUTES.azit.manage,
  },
];

export function RoomNav({ azitId, active = "members" }: RoomNavProps) {
  return (
    <nav className="dl-room-nav" aria-label="방 메뉴">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <TextLink
            key={tab.id}
            href={tab.href(azitId)}
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
