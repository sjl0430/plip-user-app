import { DailyIcon } from "@/components/atoms";

type ThumbnailUploadProps = {
  onPick?: () => void;
};

export function ThumbnailUpload({ onPick }: ThumbnailUploadProps) {
  return (
    <button type="button" className="dl-upload" onClick={onPick}>
      <DailyIcon name="image" size={22} />
      <div className="dl-info-row__body">
        <p className="dl-info-row__title">썸네일 추가</p>
        <p className="dl-info-row__desc">권장 16:9 · JPG, PNG</p>
      </div>
    </button>
  );
}
