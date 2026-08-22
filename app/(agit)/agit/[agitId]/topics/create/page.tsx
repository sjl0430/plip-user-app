import { AgitTopicCreateTemplate } from "@/components/templates";
import { ROUTES } from "@/config/routes";
import { getServerUserUuid } from "@/lib/auth/server-token";
import { getAgit } from "@/services/agitService";
import type { UiAgit } from "@/types/agit/ui";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ agitId: string }>;
};

export default async function AgitTopicCreatePage({ params }: PageProps) {
  const { agitId } = await params;
  let agit: UiAgit | null = null;

  try {
    agit = await getAgit(agitId);
  } catch {
    redirect(ROUTES.agit.detail(agitId));
  }

  if (!agit) {
    redirect(ROUTES.agit.detail(agitId));
  }

  if (!(await getServerUserUuid())) {
    redirect(ROUTES.login);
  }

  return <AgitTopicCreateTemplate agit={agit} />;
}
