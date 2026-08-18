import { TextLink } from "@/components/atoms";
import { UploadWizard } from "@/components/organisms/UploadWizard";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

type RoomUploadTemplateProps = {
  azitId: string;
};

export function RoomUploadTemplate({ azitId }: RoomUploadTemplateProps) {
  if (!getAzitById(azitId)) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.azit.root} className="dl-link">
          목록으로
        </TextLink>
      </DailyLoopAuthTemplate>
    );
  }

  return (
    <DailyLoopAuthTemplate>
      <UploadWizard />
    </DailyLoopAuthTemplate>
  );
}
