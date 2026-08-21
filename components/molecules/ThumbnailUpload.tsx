type ThumbnailUploadProps = {
  onPick?: () => void;
};

export function ThumbnailUpload({ onPick }: ThumbnailUploadProps) {
  return (
    <button type="button" className="flex w-full items-center gap-[12px] border border-[var(--dl-color-border-default)] rounded-[var(--dl-radius-lg)] bg-[var(--dl-color-bg-elevated)] p-[14px_16px] text-left flex min-h-[126px] flex-col items-center justify-center gap-[6px] border-0 rounded-[16px] bg-[var(--dl-color-bg-brand-subtle)] p-[24px_16px] cursor-pointer m-dlUploadHero" onClick={onPick}>
      <p className="m-0 text-sm font-semibold text-[var(--dl-color-text-brand)]">썸네일 추가</p>
      <p className="m-0 text-[11px] text-[var(--dl-color-text-tertiary)]">권장 16:9 · JPG, PNG</p>
    </button>
  );
}
