import { AgitManageTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitManagePage({ params }: PageProps) {
  const { agitId } = await params;
  return <AgitManageTemplate agitId={agitId} />;
}
