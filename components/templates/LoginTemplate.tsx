import { Suspense } from "react";
import { LoginForm } from "@/components/organisms";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";

export function LoginTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.intro} />
      <h2 className="dl-title">다시 만나 반가워요</h2>
      <p className="dl-subtitle">PLIP에서 오늘의 5초를 이어가세요.</p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </DailyLoopAuthTemplate>
  );
}
