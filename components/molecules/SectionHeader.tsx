import { TextLink } from "@/components/atoms";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function SectionHeader({
  title,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-2 ${className}`.trim()}
    >
      <h2 className="text-base font-medium sm:text-lg">{title}</h2>
      {actionLabel && actionHref ? (
        <TextLink
          href={actionHref}
          className="text-sm text-zinc-500 no-underline hover:underline"
        >
          {actionLabel}
        </TextLink>
      ) : null}
    </div>
  );
}
