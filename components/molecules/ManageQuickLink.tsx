import { TextLink } from "@/components/atoms";

const toneClass = {
  brand: "bg-[var(--dl-color-bg-brand-subtle)]",
  success: "bg-[var(--dl-color-bg-success)]",
  warning: "bg-[var(--dl-color-bg-warning)]",
} as const;

type ManageQuickLinkProps = {
  href: string;
  title: string;
  description: string;
  tone: keyof typeof toneClass;
};

export function ManageQuickLink({ href, title, description, tone }: ManageQuickLinkProps) {
  return (
    <TextLink href={href} className={`flex min-h-[78px] flex-col gap-[3px] rounded-[14px] p-[10px] no-underline ${toneClass[tone]}`}>
      <p className="m-0 text-xs font-semibold leading-[17px] text-[var(--dl-color-text-primary)]">{title}</p>
      <p className="m-0 text-[9px] font-normal leading-[13px] text-[var(--dl-color-text-secondary)]">{description}</p>
    </TextLink>
  );
}
