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
      className={`aspect-[4/3] w-full max-w-[120px] rounded-md bg-zinc-200 dark:bg-zinc-700 ${blurred ? "opacity-80 blur-sm" : ""} ${className}`}
    />
  );
}
