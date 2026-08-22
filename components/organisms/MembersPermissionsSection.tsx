import { MemberManageRow } from "@/components/molecules/MemberManageRow";
import type { ApiAgitDetailMember } from "@/types/agit/api";

type MembersPermissionsSectionProps = {
  members: ApiAgitDetailMember[];
};

export function MembersPermissionsSection({ members }: MembersPermissionsSectionProps) {
  return (
    <section className="flex w-full flex-col gap-3.5">
      {members.map((member) => (
        <MemberManageRow
          key={member.userUuid}
          name={member.nickname}
          meta={member.role === "HOST" ? "방장" : "멤버"}
          host={member.role === "HOST"}
        />
      ))}
    </section>
  );
}
