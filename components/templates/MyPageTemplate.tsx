import { BottomNavigation, PageHeader } from "@/components/molecules";
import {
  MyPageMenuSection,
  MyPagePointsSection,
  MyPageProfileSection,
  MyPageWithdrawSection,
} from "@/components/organisms";
import type { ReactNode } from "react";

type MyPageTemplateProps = {
  headerTitle?: string;
  showBottomNav?: boolean;
  children?: ReactNode;
};

export function MyPageTemplate({
  headerTitle = "마이페이지",
  showBottomNav = true,
  children,
}: MyPageTemplateProps) {
  return (
    <div className="plip-mypage-shell">
      <main className="flex flex-1 flex-col gap-4 px-3 pb-4 pt-4 sm:gap-5 sm:px-3.5">
        <PageHeader title={headerTitle} />
        {children ?? (
          <>
            <MyPageProfileSection />
            <MyPagePointsSection />
            <MyPageMenuSection />
            <MyPageWithdrawSection />
          </>
        )}
      </main>
      {showBottomNav ? <BottomNavigation active="mypage" variant="diary" /> : null}
    </div>
  );
}
