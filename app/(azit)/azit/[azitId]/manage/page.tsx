import { AzitManageTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitManagePage({ params }: PageProps) {
  const { azitId } = await params;
  return <AzitManageTemplate azitId={azitId} />;
}
