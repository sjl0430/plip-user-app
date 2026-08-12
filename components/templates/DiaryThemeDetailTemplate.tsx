import { IconButton } from "@/components/atoms";
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
      <div className="flex justify-center pt-4">
        <IconButton label="테마 옵션">
          <span aria-hidden>⋮</span>
        </IconButton>
      </div>
    </DiaryTemplate>
  );
}
