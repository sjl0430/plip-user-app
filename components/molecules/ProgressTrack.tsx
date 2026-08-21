type ProgressTrackProps = {
  value: number;
};

export function ProgressTrack({ value }: ProgressTrackProps) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full h-[6px] overflow-hidden rounded-[3px] bg-[var(--dl-color-bg-brand-subtle)]" aria-hidden>
      <div className="h-full rounded-[3px] bg-[var(--dl-color-text-brand)]" style={{ width: `${width}%` }} />
    </div>
  );
}
