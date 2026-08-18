import { WelcomeSection } from "@/components/organisms/WelcomeSection";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";

export function IntroTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <WelcomeSection />
    </DailyLoopAuthTemplate>
  );
}
