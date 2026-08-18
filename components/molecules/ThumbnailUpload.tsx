type ThumbnailUploadProps = {
  onPick?: () => void;
};

export function ThumbnailUpload({ onPick }: ThumbnailUploadProps) {
  return (
    <button type="button" className="dl-upload dl-upload--hero" onClick={onPick}>
      <p className="dl-upload__title">썸네일 추가</p>
      <p className="dl-upload__hint">권장 16:9 · JPG, PNG</p>
    </button>
  );
}
