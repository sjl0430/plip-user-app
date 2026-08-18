import Image from "next/image";

export function SocialLoginSection() {
  return (
    <section
      aria-label="소셜 로그인"
      className="flex w-full flex-col items-center gap-3 sm:gap-3.5"
    >
      <p className="w-full text-center text-xs font-medium text-[var(--dc-fg-secondary)] sm:text-sm">
        You Can Sign In with
      </p>

      <button
        type="button"
        aria-label="Google로 로그인"
        className="plip-glass-social flex h-12 w-full items-center justify-center rounded-[22px] sm:h-14"
      >
        <Image src="/plip/google.svg" alt="" width={32} height={32} aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Twitter로 로그인"
        className="plip-glass-social flex h-12 w-full items-center justify-center rounded-[22px] sm:h-14"
      >
        <Image src="/plip/twitter.svg" alt="" width={32} height={32} aria-hidden />
      </button>
    </section>
  );
}
