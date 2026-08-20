import { JoinCompleteTemplate } from "@/components/templates";
import { ApiError } from "@/lib/api/apiFetch";
import { getAgit } from "@/services/agitService";
import type { UiAgit } from "@/types/agit/ui";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitJoinedPage({ params }: PageProps) {
  const { agitId } = await params;
  let agit: UiAgit | null = null;
  let error: string | undefined;

  try {
    agit = await getAgit(agitId);
  } catch (caught) {
    if (caught instanceof ApiError && (caught.status === 403 || caught.status === 404)) {
      agit = null;
    } else {
      error = caught instanceof Error ? caught.message : "아지트를 불러오지 못했습니다.";
    }
  }

  return <JoinCompleteTemplate agit={agit} error={error} />;
}
