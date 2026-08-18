import { ClipViewerSection } from "@/components/organisms/ClipViewerSection";
import { AppChromeTemplate } from "@/components/templates/AppChromeTemplate";

export function ClipViewerTemplate({ clipId }: { clipId: string }) {
  return (
    <AppChromeTemplate showNav={false} variant="feed" className="plip-feed-shell">
      <ClipViewerSection clipId={clipId} mode="view" />
    </AppChromeTemplate>
  );
}

export function ClipEditTemplate({ clipId }: { clipId: string }) {
  return (
    <AppChromeTemplate showNav={false} variant="feed" className="plip-feed-shell">
      <ClipViewerSection clipId={clipId} mode="edit" />
    </AppChromeTemplate>
  );
}
