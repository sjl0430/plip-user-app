type UploadProgressProps = {
  title: string;
  step: 1 | 2 | 3 | 4;
};

export function UploadProgress({ title, step }: UploadProgressProps) {
  return (
    <>
      <div className="dl-upload-head">
        <h1 className="dl-upload-head__title">{title}</h1>
        <span className="dl-topbar__step">{step}/4</span>
      </div>
      <div className="dl-progress" aria-hidden>
        <div className="dl-progress__bar" style={{ width: `${(step / 4) * 100}%` }} />
      </div>
    </>
  );
}
