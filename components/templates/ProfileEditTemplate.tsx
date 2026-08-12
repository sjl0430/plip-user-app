import { ProfileEditForm } from "@/components/organisms";
import { MyPageTemplate } from "@/components/templates/MyPageTemplate";

export function ProfileEditTemplate() {
  return (
    <MyPageTemplate headerTitle="개인정보 수정">
      <div className="plip-section-inset">
        <ProfileEditForm />
      </div>
    </MyPageTemplate>
  );
}
