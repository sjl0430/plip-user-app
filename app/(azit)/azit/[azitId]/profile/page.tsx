import { RoomProfileTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitRoomProfilePage({ params }: PageProps) {
  const { azitId } = await params;
  return <RoomProfileTemplate azitId={azitId} />;
}
