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
    <TextLink href={href} className="dl-diary-card no-underline">
      <div className="dl-diary-card__media">
        <Image src={imageSrc} alt="" fill className="object-cover" sizes="354px" />
        <Image
          src="/plip/v13/visual-orb.svg"
          alt=""
          width={120}
          height={120}
          className="absolute top-10 right-8 size-[120px]"
        />
        <span className="dl-diary-card__chip left-4 top-4">{dateLabel}</span>
        <span className="dl-diary-card__chip right-4 bottom-4">{duration}</span>
      </div>
      <div className="dl-diary-card__body">
        <p className="dl-diary-card__title">{title}</p>
        <p className="m-0 text-[13px] leading-[18px] text-[var(--dl-color-text-secondary)]">{theme}</p>
        <p className="m-0 text-[13px] leading-[18px] text-[var(--dl-color-text-tertiary)]">{reactions}</p>
      </div>
    </TextLink>
  );
}
