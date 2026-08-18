import { PlipLogo } from "@/components/atoms/PlipLogo";

type AppLogoProps = {
  className?: string;
};

/** Auth 등에서 쓰는 앱 로고 — `public/logo.svg` */
export function AppLogo({ className = "" }: AppLogoProps) {
  return <PlipLogo className={className} width={160} height={92} priority />;
}
