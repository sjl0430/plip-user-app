import { SubmitButton } from "@/components/atoms";
import { AuthField } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function ProfileSetupForm() {
  return (
    <form className="flex w-full flex-col gap-4" action={ROUTES.diary.root} method="get">
      <button type="button" className="dl-avatar-pick" aria-label="프로필 사진 등록">
        <img src="/plip/daily-loop/profile-photo.png" alt="" width={96} height={96} />
        <img
          src="/plip/daily-loop/icon-camera.svg"
          alt=""
          width={24}
          height={24}
          className="dl-avatar-pick__cam"
        />
      </button>
      <AuthField
        id="profile-nickname"
        name="nickname"
        label="닉네임"
        placeholder="안지민"
        autoComplete="nickname"
        required
      />
      <div className="h-16" />
      <SubmitButton variant="brand">프로필 저장</SubmitButton>
    </form>
  );
}
