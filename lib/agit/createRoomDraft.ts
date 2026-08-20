import type { UiCreateAgitDraft } from "@/types/agit/ui";

export const CREATE_ROOM_DRAFT_KEY = "plip-create-room";

export function readCreateRoomDraft(): UiCreateAgitDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(CREATE_ROOM_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UiCreateAgitDraft>;
    if (typeof parsed.title !== "string" || typeof parsed.capacity !== "number") {
      return null;
    }
    return {
      title: parsed.title,
      intro: typeof parsed.intro === "string" ? parsed.intro : "",
      capacity: parsed.capacity,
      thumbnailPath: parsed.thumbnailPath,
    };
  } catch {
    return null;
  }
}
