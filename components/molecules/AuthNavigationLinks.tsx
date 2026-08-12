import { TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

type AuthNavigationLinksProps = {
  variant: "login" | "signup";
};

export function AuthNavigationLinks({ variant }: AuthNavigationLinksProps) {
  if (variant === "login") {
    return (
      <nav
        aria-label="인증 관련 링크"
        className="flex w-full items-center justify-between text-sm"
      >
        <TextLink href={ROUTES.forgotPassword}>비밀번호 찾기</TextLink>
        <TextLink href={ROUTES.signup}>회원가입</TextLink>
      </nav>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 text-sm">
      <span className="text-zinc-500">또는</span>
      <TextLink href={ROUTES.login}>로그인</TextLink>
    </div>
  );
}
