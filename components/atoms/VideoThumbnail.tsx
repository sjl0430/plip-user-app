type VideoThumbnailProps = {
  className?: string;
  blurred?: boolean;
};

export function VideoThumbnail({
  className = "",
  blurred = false,
}: VideoThumbnailProps) {
  return (
    <div
      aria-hidden
      className={`aspect-[4/3] w-full max-w-[120px] rounded-lg bg-gradient-to-br from-[#243b6b] to-[#0a1028] ring-1 ring-white/10 ${blurred ? "opacity-80 blur-sm" : ""} ${className}`}
    />
  );
}
