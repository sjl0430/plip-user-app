import { RoomUploadTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitUploadPage({ params }: PageProps) {
  const { azitId } = await params;
  return <RoomUploadTemplate azitId={azitId} />;
}
