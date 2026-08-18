import { BottomNavigation } from "@/components/molecules";
import { ProfileHubSection } from "@/components/organisms/ProfileHubSection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import type { ReactNode } from "react";

type MyPageTemplateProps = {
  headerTitle?: string;
  showBottomNav?: boolean;
  children?: ReactNode;
};

export function MyPageTemplate({
  showBottomNav = true,
  children,
}: MyPageTemplateProps) {
  return (
    <>
      <DailyLoopAuthTemplate>
        {children ?? <ProfileHubSection />}
      </DailyLoopAuthTemplate>
      {showBottomNav ? <BottomNavigation active="mypage" variant="light" /> : null}
    </>
  );
}
