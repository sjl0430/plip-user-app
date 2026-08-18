/** 촬영 타이머 표시 — `00.02.50/00.05.00` (분.초.1/100초) */
export function formatRecordTimer(elapsedMs: number, maxMs: number): string {
  const formatParts = (totalMs: number) => {
    const clamped = Math.max(0, Math.min(totalMs, maxMs));
    const totalCentis = Math.floor(clamped / 10);
    const centis = totalCentis % 100;
    const totalSeconds = Math.floor(totalCentis / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    const pad = (value: number) => String(value).padStart(2, "0");
    return `${pad(minutes)}.${pad(seconds)}.${pad(centis)}`;
  };

  return `${formatParts(elapsedMs)}/${formatParts(maxMs)}`;
}
