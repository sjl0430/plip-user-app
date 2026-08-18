import { AzitEnterTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitEnterPage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitEnterTemplate azitId={azitId} />;
}
