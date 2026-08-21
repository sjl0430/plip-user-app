import type { UiSignupDraft } from "@/types/auth/ui";

export const SIGNUP_DRAFT_KEY = "plip-signup-draft";

export function saveSignupDraft(draft: UiSignupDraft): void {
  sessionStorage.setItem(SIGNUP_DRAFT_KEY, JSON.stringify(draft));
}

export function readSignupDraft(): UiSignupDraft | null {
  const raw = sessionStorage.getItem(SIGNUP_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UiSignupDraft>;
    if (
      typeof parsed.email !== "string" ||
      typeof parsed.password !== "string" ||
      typeof parsed.verificationToken !== "string"
    ) {
      return null;
    }

    return {
      email: parsed.email,
      password: parsed.password,
      verificationToken: parsed.verificationToken,
      termsAgreements: Array.isArray(parsed.termsAgreements) ? parsed.termsAgreements : [],
    };
  } catch {
    return null;
  }
}

export function clearSignupDraft(): void {
  sessionStorage.removeItem(SIGNUP_DRAFT_KEY);
}
