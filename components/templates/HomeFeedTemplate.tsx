import { HomeFeedSection } from "@/components/organisms/HomeFeedSection";
import { BottomNavigation } from "@/components/molecules";

export function HomeFeedTemplate() {
  return (
    <div className="plip-tt-shell">
      <div className="plip-tt-shell__stage">
        <main className="plip-tt-shell__main">
          <HomeFeedSection />
        </main>
      </div>
      <BottomNavigation active="feed" variant="feed" />
    </div>
  );
}
