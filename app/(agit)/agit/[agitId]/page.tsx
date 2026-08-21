import { AgitDetailTemplate } from "@/components/templates";
import { ApiError } from "@/lib/api/apiFetch";
import { getAgitAndMembers } from "@/services/agitService";
import { getTopicGallery } from "@/services/topicService";
import type { UiAgit } from "@/types/agit/ui";
import type { UiTopicGallery } from "@/types/topic/ui";

type AgitDetailPageProps = {
  params: Promise<{ agitId: string }>;
};

const EMPTY_GALLERY: UiTopicGallery = { topic: null, videos: [] };

export default async function AgitDetailPage({ params }: AgitDetailPageProps) {
  const { agitId } = await params;
  let agit: UiAgit | null = null;
  let gallery: UiTopicGallery = EMPTY_GALLERY;
  let error: string | undefined;
  let galleryError: string | undefined;

  try {
    const detail = await getAgitAndMembers(agitId);
    agit = detail.agit;
    try {
      gallery = await getTopicGallery(agitId, detail.members);
    } catch (caught) {
      galleryError = caught instanceof Error ? caught.message : "토픽을 불러오지 못했습니다.";
    }
  } catch (caught) {
    if (caught instanceof ApiError && (caught.status === 403 || caught.status === 404)) {
      agit = null;
    } else {
      error = caught instanceof Error ? caught.message : "아지트를 불러오지 못했습니다.";
    }
  }

  return <AgitDetailTemplate agit={agit} gallery={gallery} error={error} galleryError={galleryError} />;
}
