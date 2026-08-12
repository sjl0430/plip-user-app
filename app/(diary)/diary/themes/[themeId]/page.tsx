import { DiaryThemeDetailTemplate } from "@/components/templates";
import { getThemeById } from "@/config/diary-mock";
import { notFound } from "next/navigation";

type DiaryThemePageProps = {
  params: Promise<{ themeId: string }>;
};

export default async function DiaryThemePage({ params }: DiaryThemePageProps) {
  const { themeId } = await params;
  const theme = getThemeById(themeId);

  if (!theme) {
    notFound();
  }

  return (
    <DiaryThemeDetailTemplate themeId={theme.id} themeName={theme.name} />
  );
}
