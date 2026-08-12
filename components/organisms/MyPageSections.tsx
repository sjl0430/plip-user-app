import { SubmitButton, TextLink } from "@/components/atoms";
import { MyPageMenuItem } from "@/components/molecules";
import { ROUTES } from "@/config/routes";

export function MyPageProfileSection() {
  return (
    <section
      aria-label="프로필"
      className="flex w-full flex-col gap-4 px-4 sm:px-6 md:px-8"
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <div
          aria-hidden
          className="size-14 shrink-0 rounded-full bg-zinc-200 sm:size-[70px] dark:bg-zinc-700"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-sm font-medium sm:text-base">
              plip123@gmail.com
            </span>
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
              일반
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              플립 닉네임
            </span>
            <button type="button" aria-label="닉네임 편집" className="text-xs sm:text-sm">
              편집
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MyPagePointsSection() {
  return (
    <section
      aria-label="보유 포인트"
      className="mx-4 flex flex-col gap-3 rounded-lg bg-zinc-50 px-4 py-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between md:mx-8"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium sm:text-base">보유 포인트</span>
        <span className="text-lg font-semibold sm:text-xl">99,999P</span>
      </div>
      <SubmitButton type="button" className="w-full sm:w-auto sm:px-6">
        충전
      </SubmitButton>
    </section>
  );
}

export function MyPageMenuSection() {
  return (
    <section aria-label="마이페이지 메뉴" className="flex w-full flex-col">
      <MyPageMenuItem href={ROUTES.mypage.profile}>개인정보 수정</MyPageMenuItem>
      <MyPageMenuItem href={ROUTES.mypage.notifications}>
        알림 설정
      </MyPageMenuItem>
    </section>
  );
}

export function MyPageWithdrawSection() {
  return (
    <section aria-label="회원 탈퇴" className="flex justify-center py-6 sm:py-8">
      <TextLink href="#">회원탈퇴</TextLink>
    </section>
  );
}
