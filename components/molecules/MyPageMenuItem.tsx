import { TextLink } from "@/components/atoms";
import type { ReactNode } from "react";

type MyPageMenuItemProps = {
  href: string;
  children: ReactNode;
};

export function MyPageMenuItem({ href, children }: MyPageMenuItemProps) {
  return (
    <TextLink
      href={href}
      className="flex w-full items-center border-b border-zinc-100 px-4 py-4 no-underline dark:border-zinc-800"
    >
      {children}
    </TextLink>
  );
}
