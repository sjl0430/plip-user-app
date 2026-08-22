import { signOut } from "@/auth";
import { ROUTES } from "@/config/routes";
import { redirect } from "next/navigation";

export class SessionExpiredError extends Error {
  constructor(message = "세션이 만료되었습니다.") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export function isSessionExpiredError(error: unknown): error is SessionExpiredError {
  return error instanceof SessionExpiredError;
}

/** reissue 실패 등 세션 유지 불가 시 로컬 세션 삭제 후 로그인으로 이동 */
export async function handleSessionExpired(): Promise<never> {
  await signOut({ redirect: false });
  redirect(ROUTES.login);
}
