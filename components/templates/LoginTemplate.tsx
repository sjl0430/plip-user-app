import { AuthCopyright } from "@/components/atoms";
import { LoginForm } from "@/components/organisms";

export function LoginTemplate() {
  return (
    <main className="plip-login-bg plip-auth-page">
      <div aria-hidden className="hidden h-11 w-full shrink-0 sm:block" />

      <h1 className="plip-auth-heading">Glad to meet you again!</h1>

      <LoginForm />

      <AuthCopyright variant="light" className="mt-auto w-full max-w-xs px-2 sm:max-w-md md:max-w-lg" />
    </main>
  );
}
