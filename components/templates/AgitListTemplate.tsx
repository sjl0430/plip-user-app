import { TextLink } from "@/components/atoms";
import { BottomNavigation, PageHeader } from "@/components/molecules";
import { AgitListSection } from "@/components/organisms/AgitListSection";
import { ROUTES } from "@/config/routes";

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.5 16.5H17.5L16.2 15.2V11C16.2 8.65 14.7 6.7 12.6 6.2V5.7C12.6 5.05 12.15 4.5 11.5 4.5C10.85 4.5 10.4 5.05 10.4 5.7V6.2C8.3 6.7 6.8 8.65 6.8 11V15.2L6.5 16.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4 18C10.7 18.85 11.5 19.45 12.5 19.45C13.5 19.45 14.3 18.85 14.6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AgitListTemplate() {
  return (
    <div className="plip-mypage-shell">
      <main className="flex flex-1 flex-col gap-4 px-3 pb-4 pt-4 sm:gap-5 sm:px-3.5">
        <PageHeader
          title="아지트 리스트"
          trailing={
            <TextLink
              href={ROUTES.mypage.notifications}
              aria-label="알림"
              className="inline-flex size-8 items-center justify-center text-zinc-600 no-underline sm:size-9"
            >
              <BellIcon className="size-5" />
            </TextLink>
          }
        />
        <AgitListSection />
      </main>
      <BottomNavigation active="azit" variant="diary" />
    </div>
  );
}
