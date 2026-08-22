import { AgitMembersTemplate } from "@/components/templates";
import { getServerUserUuid } from "@/lib/auth/server-token";
import { getAgitAndMembers, sortAgitMembers } from "@/services/agitService";
import type { ApiAgitDetailMember } from "@/types/agit/api";
import type { UiAgit } from "@/types/agit/ui";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitMembersPage({ params }: PageProps) {
  const { agitId } = await params;
  let agit: UiAgit | null = null;
  let members: ApiAgitDetailMember[] = [];

  try {
    const detail = await getAgitAndMembers(agitId);
    agit = detail.agit;
    const userUuid = await getServerUserUuid();
    members = sortAgitMembers(detail.members, userUuid);
  } catch {
    agit = null;
  }

  return <AgitMembersTemplate agit={agit} members={members} />;
}
