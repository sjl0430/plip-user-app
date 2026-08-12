import { PageTitle, Separator } from "@/components/atoms";

type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-2">
      <PageTitle>{title}</PageTitle>
      <Separator />
    </header>
  );
}
