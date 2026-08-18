import { ClipViewerTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ clipId: string }>;
};

export default async function ClipViewerPage({ params }: PageProps) {
  const { clipId } = await params;
  return <ClipViewerTemplate clipId={clipId} />;
}
