import * as agitApi from "@/lib/api/agitApi";
import type { ApiMyAgitItem } from "@/types/agit/api";
import type { UiMyAgit } from "@/types/agit/ui";

function mapMyAgit(item: ApiMyAgitItem): UiMyAgit {
  return {
    id: item.agitUuid,
    name: item.agitName,
  };
}

export async function listMyAgits(): Promise<UiMyAgit[]> {
  const items = await agitApi.getMyAgits();
  return items.map(mapMyAgit);
}
