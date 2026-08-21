import { TextLink } from "@/components/atoms";
import { SettingsRow } from "@/components/molecules/SettingsRow";
import { ROUTES } from "@/config/routes";

export function AccountSecuritySection() {
  return (
    <section className="flex w-full flex-col gap-3.5">
      <SettingsRow title="이메일" description="name@example.com" showChevron />
      <SettingsRow
        href={ROUTES.mypage.password}
        title="비밀번호 변경"
        description="마지막 변경 30일 전"
      />

      <h2 className="m-0 text-base font-semibold leading-[23px] text-[var(--dl-color-text-primary)]">서비스</h2>
      <SettingsRow title="이용약관" showChevron />
      <SettingsRow title="개인정보 처리방침" showChevron />
      <SettingsRow title="오픈소스 라이선스" showChevron />

      <div className="flex w-full flex-col gap-[14px] mt-auto">
        <TextLink href={ROUTES.login} className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-brand-subtle)] !text-[var(--dl-color-text-brand)] shadow-[none] [backdrop-filter:none] m-dlBtnSecondary no-underline">
          로그아웃
        </TextLink>
        <TextLink href={ROUTES.mypage.settings} className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[var(--dl-radius-md)] p-[12px_20px] text-sm font-medium leading-5 !no-underline border-0 bg-[var(--dl-color-bg-brand-subtle)] border-0 bg-[var(--dl-color-bg-danger)] !text-[var(--dl-color-text-danger)] shadow-[none] m-dlBtnDanger no-underline">
          계정 삭제
        </TextLink>
        <p className="m-0 text-[11px] leading-[17px] text-[var(--dl-color-text-danger)]">
          계정 삭제 시 업로드한 영상과 방별 프로필이 함께 삭제되며 복구할 수 없습니다.
        </p>
      </div>
    </section>
  );
}
