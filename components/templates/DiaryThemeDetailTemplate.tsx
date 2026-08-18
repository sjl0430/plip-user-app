import { DiaryThemeDetailSection } from "@/components/organisms";
import { DiaryTemplate } from "@/components/templates/DiaryTemplate";

type DiaryThemeDetailTemplateProps = {
  themeId: string;
  themeName: string;
};

export function DiaryThemeDetailTemplate({
  themeId,
  themeName,
}: DiaryThemeDetailTemplateProps) {
  return (
    <DiaryTemplate>
      <DiaryThemeDetailSection themeId={themeId} themeName={themeName} />
    </DiaryTemplate>
  );
}
