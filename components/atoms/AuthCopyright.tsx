type AuthCopyrightProps = {
  variant?: "light" | "muted";
  className?: string;
};

export function AuthCopyright({
  variant = "light",
  className = "",
}: AuthCopyrightProps) {
  const colorClass =
    variant === "muted" ? "text-plip-muted" : "text-white/90";

  return (
    <footer
      className={`text-center font-[family-name:var(--font-poppins)] text-[11px] leading-[17px] ${colorClass} ${className}`}
    >
      <p>COPYRIGHT © 2026 PLIP.</p>
      <p>ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
