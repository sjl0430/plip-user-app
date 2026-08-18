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
      className="flex w-full items-center border-b border-white/10 px-4 py-4 text-sm text-white no-underline"
    >
      {children}
    </TextLink>
  );
}
