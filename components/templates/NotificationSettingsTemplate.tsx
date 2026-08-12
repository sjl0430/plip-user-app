import { NotificationSettingsForm } from "@/components/organisms";
import { MyPageTemplate } from "@/components/templates/MyPageTemplate";

export function NotificationSettingsTemplate() {
  return (
    <MyPageTemplate headerTitle="알림 설정">
      <div className="plip-section-inset">
        <NotificationSettingsForm />
      </div>
    </MyPageTemplate>
  );
}
