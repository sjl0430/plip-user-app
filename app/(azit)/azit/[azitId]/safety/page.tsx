import { AzitSafetyTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitSafetyPage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitSafetyTemplate azitId={azitId} />;
}
