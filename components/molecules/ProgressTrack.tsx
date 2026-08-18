type ProgressTrackProps = {
  value: number;
};

export function ProgressTrack({ value }: ProgressTrackProps) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div className="dl-progress-track" aria-hidden>
      <div className="dl-progress-track__bar" style={{ width: `${width}%` }} />
    </div>
  );
}
