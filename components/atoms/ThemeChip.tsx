import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ThemeChipProps = {
  name: string;
  href: string;
  accent?: "pink" | "cyan" | "neutral" | "add";
  className?: string;
};

const RING_SRC: Record<NonNullable<ThemeChipProps["accent"]>, string> = {
  add: "/plip/figma/rings/story-add.svg",
  pink: "/plip/figma/rings/story-pink.svg",
  cyan: "/plip/figma/rings/story-cyan.svg",
  neutral: "/plip/figma/rings/story-add.svg",
};

/** Figma Hybrid Diary 스토리 링 + shadcn 톤 */
export function ThemeChip({
  name,
  href,
  accent = "neutral",
  className = "",
}: ThemeChipProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-16 shrink-0 flex-col items-center gap-1.5 text-[#161823] no-underline",
        className,
      )}
    >
      <span className="relative block size-14 overflow-hidden rounded-full">
        <Image
          src={RING_SRC[accent]}
          alt=""
          width={64}
          height={52}
          className="absolute inset-0 size-full object-contain"
        />
      </span>
      <span className="max-w-16 truncate text-center text-[10px] font-semibold leading-tight">
        {name}
      </span>
    </Link>
  );
}
