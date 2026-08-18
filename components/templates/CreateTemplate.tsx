import { UploadWizard } from "@/components/organisms/UploadWizard";
import { DailyLoopAuthTemplate } from "@/components/templates/DailyLoopAuthTemplate";

export function CreateTemplate() {
  return (
    <DailyLoopAuthTemplate>
      <UploadWizard />
    </DailyLoopAuthTemplate>
  );
}
