import { AgitTopicsTemplate } from "@/components/templates";
import { getAgitAndMembers } from "@/services/agitService";
import { listTopicsByStatus } from "@/services/topicService";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicListSection, UiTopicListSections } from "@/types/topic/ui";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

const EMPTY_SECTION: UiTopicListSection = { items: [] };

async function loadSection(
  agitId: string,
  status: "ONGOING" | "UPCOMING" | "PAST",
): Promise<UiTopicListSection> {
  try {
    const items = await listTopicsByStatus(agitId, status, 10);
    return { items };
  } catch (caught) {
    return {
      items: [],
      error: caught instanceof Error ? caught.message : "토픽을 불러오지 못했습니다.",
    };
  }
}

export default async function AgitTopicsPage({ params }: PageProps) {
  const { agitId } = await params;
  let agit: UiAgit | null = null;

  try {
    const detail = await getAgitAndMembers(agitId);
    agit = detail.agit;
  } catch {
    agit = null;
  }

  let sections: UiTopicListSections = {
    ongoing: EMPTY_SECTION,
    upcoming: EMPTY_SECTION,
    past: EMPTY_SECTION,
  };

  if (agit) {
    const [ongoing, upcoming, past] = await Promise.all([
      loadSection(agitId, "ONGOING"),
      loadSection(agitId, "UPCOMING"),
      loadSection(agitId, "PAST"),
    ]);
    sections = { ongoing, upcoming, past };
  }

  return <AgitTopicsTemplate agit={agit} sections={sections} />;
}
