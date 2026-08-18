import { UploadWizard } from "@/components/organisms/UploadWizard";
import { TextLink } from "@/components/atoms";
import { getAzitById } from "@/config/azit-mock";
import { ROUTES } from "@/config/routes";

type RoomUploadTemplateProps = {
  azitId: string;
};

export function RoomUploadTemplate({ azitId }: RoomUploadTemplateProps) {
  if (!getAzitById(azitId)) {
    return (
      <section className="px-6 py-8">
        <p className="dl-subtitle">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.azit.root} className="dl-link">
          목록으로
        </TextLink>
      </section>
    );
  }

  return <UploadWizard />;
}
