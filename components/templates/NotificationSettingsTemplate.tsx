import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { NotificationSettingsForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function NotificationSettingsTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="dl-eyebrow">P03 · NOTIFICATIONS</p>
      <AuthTopBar title="알림 설정" backHref={ROUTES.mypage.root} />
      <h2 className="dl-title dl-title--section">알림을 필요한 만큼만</h2>
      <p className="dl-subtitle">지속적인 알림 피로를 줄이도록 방과 기능별로 조정합니다.</p>
      <NotificationSettingsForm />
    </DailyLoopAuthTemplate>
  );
}
