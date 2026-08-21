type UploadProgressProps = {
  title: string;
  step: 1 | 2 | 3 | 4;
};

export function UploadProgress({ title, step }: UploadProgressProps) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="m-0 text-[22px] font-semibold leading-[31px] text-[var(--dl-color-text-primary)]">{title}</h1>
        <span className="ml-auto text-xs font-semibold leading-[17px] text-[var(--dl-color-text-brand)]">{step}/4</span>
      </div>
      <div className="w-full h-[4px] overflow-hidden rounded-[2px] bg-[var(--dl-color-bg-surface)]" aria-hidden>
        <div className="h-full rounded-[2px] bg-[var(--dl-color-bg-brand)]" style={{ width: `${(step / 4) * 100}%` }} />
      </div>
    </>
  );
}
