import { ChangePasswordForm } from "@/components/organisms";
import { MyPageTemplate } from "@/components/templates/MyPageTemplate";

export function ChangePasswordTemplate() {
  return (
    <MyPageTemplate headerTitle="비밀번호 변경">
      <div className="plip-section-inset">
        <ChangePasswordForm />
      </div>
    </MyPageTemplate>
  );
}
