import Image from "next/image";

type AppLogoProps = {
  className?: string;
};

export function AppLogo({ className = "" }: AppLogoProps) {
  return (
    <Image
      className={`dark:invert h-5 w-[100px] ${className}`}
      src="/next.svg"
      alt="Next.js logo"
      width={100}
      height={20}
      priority
    />
  );
}
