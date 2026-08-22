import { AuthTopBar } from "@/components/molecules";
import { NotificationSettingsForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function NotificationSettingsTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">P03 · NOTIFICATIONS</p>
      <AuthTopBar title="알림 설정" backHref={ROUTES.mypage.root} />
      <h2 className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-[24px] leading-[35px] m-dlTitleSection">알림을 필요한 만큼만</h2>
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">지속적인 알림 피로를 줄이도록 방과 기능별로 조정합니다.</p>
      <NotificationSettingsForm />
    </DailyLoopAuthTemplate>
  );
}
