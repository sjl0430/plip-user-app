import { PageTitle, Separator } from "@/components/atoms";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  trailing?: ReactNode;
};

export function PageHeader({ title, trailing }: PageHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-2">
      <div className="relative flex min-h-9 items-center justify-center">
        <PageTitle>{title}</PageTitle>
        {trailing ? (
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center">
            {trailing}
          </div>
        ) : null}
      </div>
      <Separator />
    </header>
  );
}
