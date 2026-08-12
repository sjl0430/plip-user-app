import { TextLink } from "@/components/atoms";
import type { ComponentProps } from "react";

type ThemeChipProps = {
  name: string;
  href: string;
} & Omit<ComponentProps<typeof TextLink>, "href" | "children">;

export function ThemeChip({ name, href, className = "", ...props }: ThemeChipProps) {
  return (
    <TextLink
      href={href}
      className={`flex size-14 shrink-0 items-center justify-center rounded-md bg-zinc-200 text-sm font-medium no-underline sm:size-16 dark:bg-zinc-700 ${className}`}
      {...props}
    >
      {name}
    </TextLink>
  );
}
