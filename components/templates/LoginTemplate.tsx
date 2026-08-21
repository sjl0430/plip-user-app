import { ui } from "@/components/atoms/styles";
import { AuthTopBar } from "@/components/molecules/AuthTopBar";
import { LoginForm } from "@/components/organisms";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { ROUTES } from "@/config/routes";
import { Suspense } from "react";

export function LoginTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <AuthTopBar title="" backHref={ROUTES.intro} />
      <h2 className={ui.title}>다시 만나 반가워요</h2>
      <p className={ui.subtitle}>PLIP에서 오늘의 5초를 이어가세요.</p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </DailyLoopAuthTemplate>
  );
}
