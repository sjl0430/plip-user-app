type SeparatorProps = {
  className?: string;
};

export function Separator({ className = "" }: SeparatorProps) {
  return (
    <hr
      className={`w-full border-0 border-t border-zinc-200 dark:border-zinc-700 ${className}`}
    />
  );
}
