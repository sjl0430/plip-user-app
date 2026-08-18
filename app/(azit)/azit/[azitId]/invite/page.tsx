import { InviteConfirmTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ azitId: string }>;
};

export default async function AzitInvitePage({ params }: PageProps) {
  const { azitId } = await params;
  return <InviteConfirmTemplate azitId={azitId} />;
}
