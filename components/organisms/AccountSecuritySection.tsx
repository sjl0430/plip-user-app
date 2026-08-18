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

      <h2 className="dl-section-title">서비스</h2>
      <SettingsRow title="이용약관" showChevron />
      <SettingsRow title="개인정보 처리방침" showChevron />
      <SettingsRow title="오픈소스 라이선스" showChevron />

      <div className="dl-actions">
        <TextLink href={ROUTES.login} className="dl-btn dl-btn--secondary no-underline">
          로그아웃
        </TextLink>
        <TextLink href={ROUTES.mypage.settings} className="dl-btn dl-btn--danger no-underline">
          계정 삭제
        </TextLink>
        <p className="dl-danger-hint">
          계정 삭제 시 업로드한 영상과 방별 프로필이 함께 삭제되며 복구할 수 없습니다.
        </p>
      </div>
    </section>
  );
}
