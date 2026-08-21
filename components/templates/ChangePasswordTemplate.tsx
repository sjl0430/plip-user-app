import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { ChangePasswordForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function ChangePasswordTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">P04 · PASSWORD</p>
      <AuthTopBar title="비밀번호 변경" backHref={ROUTES.mypage.settings} />
      <h2 className="m-0 text-[28px] font-bold leading-[34px] text-[var(--dl-color-text-primary)] text-[24px] leading-[35px] m-dlTitleSection">비밀번호를 변경하세요</h2>
      <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">마지막 변경 30일 전</p>
      <ChangePasswordForm />
    </DailyLoopAuthTemplate>
  );
}
