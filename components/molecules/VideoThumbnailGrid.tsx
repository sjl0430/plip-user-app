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
        <VideoThumbnail key={index} blurred={blurred} className="aspect-[1_/_1] rounded-[0] bg-[linear-gradient(160deg,_rgba(37,_244,_238,_0.12),_transparent_50%),_linear-gradient(145deg,_#5a5a5a,_#1f1f1f)] [&:nth-child(3n + 2)]:bg-[linear-gradient(160deg,_rgba(254,_44,_85,_0.16),_transparent_55%),_linear-gradient(145deg,_#4a4a4a,_#181818)] [&:nth-child(3n)]:bg-[linear-gradient(145deg,_#6a6a6a,_#242424)]" />
      ))}
    </div>
  );
}
