import { AzitMembersTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitMembersPage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitMembersTemplate azitId={azitId} />;
}
