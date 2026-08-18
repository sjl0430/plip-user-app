import Image from "next/image";

type PlipLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/** 브랜드 로고 — `public/logo.svg` 고정 사용 */
export function PlipLogo({
  className = "",
  width = 224,
  height = 129,
  priority = false,
}: PlipLogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="PLIP"
      width={width}
      height={height}
      className={`plip-logo ${className}`.trim()}
      priority={priority}
    />
  );
}
