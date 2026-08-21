import { UploadWizard } from "@/components/organisms/UploadWizard";
import { TextLink } from "@/components/atoms";
import { getAgitById } from "@/config/agit-mock";
import { ROUTES } from "@/config/routes";

type RoomUploadTemplateProps = {
  agitId: string;
};

export function RoomUploadTemplate({ agitId }: RoomUploadTemplateProps) {
  if (!getAgitById(agitId)) {
    return (
      <section className="px-6 py-8">
        <p className="m-0 text-sm font-normal leading-5 text-[var(--dl-color-text-secondary)]">방을 찾을 수 없습니다.</p>
        <TextLink href={ROUTES.agit.root} className="!text-[var(--dl-color-text-brand)] text-sm font-medium leading-5 !no-underline hover:!underline">
          목록으로
        </TextLink>
      </section>
    );
  }

  return <UploadWizard />;
}
