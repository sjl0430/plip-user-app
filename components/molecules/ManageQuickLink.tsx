import { TextLink } from "@/components/atoms";

type ManageQuickLinkProps = {
  href: string;
  title: string;
  description: string;
  tone: "brand" | "success" | "warning";
};

export function ManageQuickLink({ href, title, description, tone }: ManageQuickLinkProps) {
  return (
    <TextLink href={href} className={`dl-quick dl-quick--${tone} no-underline`}>
      <p className="dl-quick__title">{title}</p>
      <p className="dl-quick__desc">{description}</p>
    </TextLink>
  );
}
