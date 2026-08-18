import { ClipEditTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ clipId: string }>;
};

export default async function ClipEditPage({ params }: PageProps) {
  const { clipId } = await params;
  return <ClipEditTemplate clipId={clipId} />;
}
