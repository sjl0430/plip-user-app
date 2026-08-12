import { VideoThumbnail } from "@/components/atoms";

type VideoThumbnailGridProps = {
  count: number;
  blurred?: boolean;
  className?: string;
};

export function VideoThumbnailGrid({
  count,
  blurred = false,
  className = "",
}: VideoThumbnailGridProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${className}`.trim()}
    >
      {Array.from({ length: count }, (_, index) => (
        <VideoThumbnail key={index} blurred={blurred} className="plip-diary-thumb" />
      ))}
    </div>
  );
}
