import { IntroCursorEffects } from "@/components/organisms";
import { AuroraButtonLink, PlipLogo, AuthCopyright } from "@/components/atoms";
import { ROUTES } from "@/config/routes";

export function IntroTemplate() {
  return (
    <main className="plip-intro-page">
      <IntroCursorEffects />
      <section aria-label="PLIP 소개" className="intro-hero">
        <PlipLogo className="intro-logo intro-enter-down" />
        <AuroraButtonLink className="intro-enter-up" href={ROUTES.diary.root}>
          Get Started
        </AuroraButtonLink>
      </section>

      <AuthCopyright variant="muted" className="intro-footer" />
    </main>
  );
}
