type UserAvatarProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function UserAvatar({
  src,
  alt = "",
  size = 28,
  className = "",
}: UserAvatarProps) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full border border-white/45 bg-[var(--dl-color-bg-brand-subtle)] ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} width={size} height={size} className="size-full object-cover" />
    </span>
  );
}
