import { AppLogo, Heading, InlineCode, Text } from "@/components/atoms";
import { ExternalLink, LinkButton } from "@/components/molecules";

export function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
      <Heading>
        To get started, edit the <InlineCode>page.tsx</InlineCode> file.
      </Heading>
      <Text>
        Looking for a starting point or more instructions? Head over to{" "}
        <ExternalLink href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
          Templates
        </ExternalLink>{" "}
        or the{" "}
        <ExternalLink href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app">
          Learning
        </ExternalLink>{" "}
        center.
      </Text>
    </div>
  );
}

export function ActionButtons() {
  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <LinkButton
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        icon={{
          src: "/vercel.svg",
          alt: "Vercel logomark",
          width: 16,
          height: 14,
          className: "dark:invert h-[14px] w-4",
        }}
      >
        Deploy Now
      </LinkButton>
      <LinkButton
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        variant="secondary"
      >
        Documentation
      </LinkButton>
    </div>
  );
}

export function HomeHeader() {
  return <AppLogo />;
}

export function HeroSection() {
  return (
    <main className="flex w-full max-w-3xl flex-col items-center justify-between bg-white px-4 py-16 sm:items-start sm:px-8 sm:py-24 md:px-16 md:py-32 dark:bg-black">
      <HomeHeader />
      <HeroContent />
      <ActionButtons />
    </main>
  );
}
