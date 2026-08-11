import Image from "next/image";
import { Button } from "@/components/atoms";

type LinkButtonIcon = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

type LinkButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  icon?: LinkButtonIcon;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  icon,
  children,
}: LinkButtonProps) {
  return (
    <Button
      href={href}
      variant={variant}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && (
        <Image
          className={icon.className}
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
        />
      )}
      {children}
    </Button>
  );
}
