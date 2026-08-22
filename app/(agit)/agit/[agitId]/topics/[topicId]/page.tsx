import { AgitTopicViewerTemplate } from "@/components/templates";
import { ROUTES } from "@/config/routes";
import { getAgitAndMembers } from "@/services/agitService";
import { getTopicViewer } from "@/services/topicService";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicDetail, UiTopicVideo } from "@/types/topic/ui";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ agitId: string; topicId: string }>;
};

export default async function AgitTopicViewerPage({ params }: PageProps) {
  const { agitId, topicId } = await params;
  let agit: UiAgit | null = null;
  let topic: UiTopicDetail | null = null;
  let videos: UiTopicVideo[] = [];

  try {
    const detail = await getAgitAndMembers(agitId);
    agit = detail.agit;
    const viewer = await getTopicViewer(topicId, detail.members);
    topic = viewer.topic;
    videos = viewer.videos;
  } catch {
    redirect(ROUTES.agit.topics(agitId));
  }

  return <AgitTopicViewerTemplate agit={agit} topic={topic} videos={videos} />;
}
