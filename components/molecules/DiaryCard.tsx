import { TextLink } from "@/components/atoms";
import Image from "next/image";

type DiaryCardProps = {
  href: string;
  imageSrc: string;
  dateLabel: string;
  duration: string;
  title: string;
  theme: string;
  reactions: string;
};

export function DiaryCard({
  href,
  imageSrc,
  dateLabel,
  duration,
  title,
  theme,
  reactions,
}: DiaryCardProps) {
  return (
    <TextLink href={href} className="overflow-hidden border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] no-underline">
      <div className="relative h-[180px] overflow-hidden">
        <Image src={imageSrc} alt="" fill className="object-cover" sizes="354px" />
        <Image
          src="/plip/v13/visual-orb.svg"
          alt=""
          width={120}
          height={120}
          className="absolute top-10 right-8 size-[120px]"
        />
        <span className="absolute rounded-[999px] bg-[rgba(255,_255,_255,_0.88)] p-[4px_8px] text-[11px] font-medium leading-[15px] text-[var(--dl-color-text-primary)] left-4 top-4">{dateLabel}</span>
        <span className="absolute rounded-[999px] bg-[rgba(255,_255,_255,_0.88)] p-[4px_8px] text-[11px] font-medium leading-[15px] text-[var(--dl-color-text-primary)] right-4 bottom-4">{duration}</span>
      </div>
      <div className="flex flex-col gap-[6px] p-[8px_16px_16px]">
        <p className="m-0 text-lg font-semibold leading-6 text-[var(--dl-color-text-primary)]">{title}</p>
        <p className="m-0 text-[13px] leading-[18px] text-[var(--dl-color-text-secondary)]">{theme}</p>
        <p className="m-0 text-[13px] leading-[18px] text-[var(--dl-color-text-tertiary)]">{reactions}</p>
      </div>
    </TextLink>
  );
}
