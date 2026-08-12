import { Input, SubmitButton } from "@/components/atoms";
import { FormField, SwitchField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function NotificationSettingsForm() {
  return (
    <form
      className="flex w-full flex-col gap-6"
      action={ROUTES.mypage.root}
      method="post"
    >
      <SwitchField
        id="push-enabled"
        name="pushEnabled"
        label="푸시 알림 수신"
        defaultChecked
      />

      <SwitchField
        id="email-enabled"
        name="emailEnabled"
        label="이메일 알림 수신"
      />

      <FormField label="방해 금지 시작 시간" htmlFor="quiet-hours-start">
        <Input id="quiet-hours-start" name="quietHoursStart" type="time" />
      </FormField>

      <SubmitButton>적용</SubmitButton>
    </form>
  );
}
