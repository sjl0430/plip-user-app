import { AgitListTemplate } from "@/components/templates";
import { listMyAgits } from "@/services/agitService";
import type { UiMyAgit } from "@/types/agit/ui";

export default async function AgitListPage() {
  let items: UiMyAgit[] = [];
  let error: string | undefined;

  try {
    items = await listMyAgits();
  } catch (caught) {
    items = [];
    error =
      caught instanceof Error ? caught.message : "아지트 목록을 불러오지 못했습니다.";
  }

  return <AgitListTemplate items={items} error={error} />;
}
