import { TextLink } from "@/components/atoms";
import { UploadWizard } from "@/components/organisms/UploadWizard";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type RoomUploadTemplateProps = {
  agitId: string;
};

export function RoomUploadTemplate({ agitId }: RoomUploadTemplateProps) {
  if (!getAgitById(agitId)) {
    return (
      <DailyLoopAuthTemplate>
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="dl-link">
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
