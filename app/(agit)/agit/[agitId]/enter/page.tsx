import { AgitEnterTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitEnterPage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitEnterTemplate agitId={agitId} />;
}
