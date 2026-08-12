import { DiaryDateTemplate } from "@/components/templates";
import { parseDiaryDateParam } from "@/config/diary-mock";
import { notFound } from "next/navigation";

type DiaryDatePageProps = {
  params: Promise<{ date: string }>;
};

export default async function DiaryDatePage({ params }: DiaryDatePageProps) {
  const { date } = await params;
  const parsedDate = parseDiaryDateParam(date);

  if (!parsedDate) {
    notFound();
  }

  return <DiaryDateTemplate date={parsedDate} />;
}
