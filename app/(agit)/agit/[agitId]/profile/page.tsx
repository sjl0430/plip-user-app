import { RoomProfileTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitRoomProfilePage({ params }: PageProps) {
  const { agitId } = await params;
  return <RoomProfileTemplate agitId={agitId} />;
}
