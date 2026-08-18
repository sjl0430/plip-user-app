import { InviteConfirmTemplate } from "@/components/templates";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitInvitePage({ params }: PageProps) {
  const { agitId } = await params;
  return <InviteConfirmTemplate agitId={agitId} />;
}
