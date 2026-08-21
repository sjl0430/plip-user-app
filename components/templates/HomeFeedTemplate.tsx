import { HomeFeedSection } from "@/components/organisms/HomeFeedSection";
import { BottomNavigation } from "@/components/molecules";

export function HomeFeedTemplate() {
  return (
    <div className="md:!w-full md:!max-w-none md:h-full md:min-h-0 flex min-h-dvh w-full max-w-none mx-auto flex-col bg-[var(--plip-tt-bg)] text-[var(--plip-tt-text)]">
      <div className="flex flex-1 min-w-0 min-h-0 flex-col w-full">
        <main className="flex flex-1 min-h-0 flex-col w-full">
          <HomeFeedSection />
        </main>
      </div>
      <BottomNavigation active="feed" variant="feed" />
    </div>
  );
}
