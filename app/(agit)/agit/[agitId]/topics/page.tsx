import { AgitTopicsTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitTopicsPage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitTopicsTemplate agitId={agitId} />;
}
