import { AgitTopicEditTemplate } from "@/components/templates";
import { ROUTES } from "@/config/routes";
import { getServerUserUuid } from "@/lib/auth/server-token";
import { getAgit } from "@/services/agitService";
import { getTopic } from "@/services/topicService";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicDetail } from "@/types/topic/ui";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ agitId: string; topicId: string }>;
};

export default async function AgitTopicEditPage({ params }: PageProps) {
  const { agitId, topicId } = await params;
  let agit: UiAgit | null = null;
  let topic: UiTopicDetail | null = null;

  try {
    agit = await getAgit(agitId);
    topic = await getTopic(topicId);
  } catch {
    redirect(ROUTES.agit.topics(agitId));
  }

  if (!agit || !topic) {
    redirect(ROUTES.agit.topics(agitId));
  }

  const currentUserUuid = await getServerUserUuid();
  const canEdit = agit.myRole === "HOST" || topic.creatorUuid === currentUserUuid;
  if (!canEdit) {
    redirect(ROUTES.agit.topics(agitId));
  }

  return <AgitTopicEditTemplate agit={agit} topic={topic} />;
}
