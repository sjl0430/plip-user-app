import { SubmitButton, TextLink } from "@/components/atoms";
import { ROUTES } from "@/config/routes";
import Image from "next/image";

export function WelcomeSection() {
  return (
    <section className="flex w-full flex-col gap-6" aria-label="시작하기">
      <div className="dl-welcome-hero">
        <Image src="/plip/v13/welcome-orb.svg" alt="" width={210} height={210} className="dl-welcome-hero__orb" />
        <p className="dl-welcome-hero__title">PLIP</p>
        <p className="dl-welcome-hero__copy">
          일상을 강요하지 않고,
          <br />
          목적에 맞게 함께 기록해요.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3.5">
        <SubmitButton type="button" variant="brand">
          Google로 시작
        </SubmitButton>
        <TextLink href={ROUTES.signup} className="dl-btn dl-btn--secondary no-underline">
          이메일로 시작
        </TextLink>
        <p className="text-center text-[13px] font-medium text-[var(--dl-color-text-brand)]">
          이미 계정이 있나요?{" "}
          <TextLink href={ROUTES.login} className="dl-link text-[13px]">
            로그인
          </TextLink>
        </p>
      </div>
      <p className="mt-auto text-center text-[10px] leading-[12px] text-[var(--dl-color-text-tertiary)]">
        계속하면 서비스 약관과 개인정보 처리방침에 동의합니다.
      </p>
    </section>
  );
}
