import { AzitTopicsTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitTopicsPage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitTopicsTemplate azitId={azitId} />;
}
