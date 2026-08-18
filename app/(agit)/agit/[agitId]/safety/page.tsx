import { AgitSafetyTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitSafetyPage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitSafetyTemplate agitId={agitId} />;
}
